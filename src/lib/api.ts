// Client-side helper to submit the public enquiry form to the gateway.
// In dev, NEXT_PUBLIC_API_BASE is empty and the relative /api path is proxied by
// next.config rewrites. In production (Netlify), set NEXT_PUBLIC_API_BASE to the
// gateway's public URL and add that origin to the backend's ALLOWED_ORIGINS.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  interest?: string;
  message?: string;
  source: string;
  page_url?: string;
  /** Company leads for the hiring-test platform (/hire). */
  company?: string;
  job_title?: string;
  company_size?: string;
  hiring_volume?: string;
  /** Honeypot. Hidden from real users; anything here marks the submission a bot. */
  website?: string;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const resp = await fetch(`${API_BASE}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    let msg = 'Something went wrong. Please try again.';
    try {
      const body = await resp.json();
      if (body?.error) msg = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
}

// ─── Scholarship ──────────────────────────────────────────────────────────────

export interface ScholarshipProgram {
  courseId: string;
  courseName: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  sectionSummary: string;
  opensAt?: string;
  closesAt?: string;
  seatsLeft?: number;
}

export interface ScholarshipApplication {
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  courseId: string;
  qualification?: string;
  college?: string;
  graduationYear?: number;
  city?: string;
  page_url?: string;
  utm?: Record<string, string>;
  /** Honeypot. Hidden from real users; anything here marks the submission a bot. */
  website?: string;
}

export interface ScholarshipApplyResult {
  applicationId: string;
  /** Where to send the applicant to sit their test. Carries a one-time claim token. */
  testUrl: string;
  assessment: { title: string; durationMinutes: number; totalMarks: number };
}

/**
 * The courses actually open for a scholarship right now.
 *
 * This is the live half of the page: the backend only lists a programme whose
 * paper is published, inside its window and not full, so the picker can never
 * offer a course the apply call would reject.
 */
export async function getScholarshipPrograms(): Promise<ScholarshipProgram[]> {
  const resp = await fetch(`${API_BASE}/api/scholarship/config`, { cache: 'no-store' });
  if (!resp.ok) throw new Error('Could not load the scholarship programmes.');
  const body = await resp.json();
  return body?.programs ?? [];
}

export async function applyForScholarship(
  payload: ScholarshipApplication,
): Promise<ScholarshipApplyResult> {
  const resp = await fetch(`${API_BASE}/api/scholarship/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(body?.error || 'Something went wrong. Please try again.');
  }
  return body as ScholarshipApplyResult;
}

// ─── Online enrolment (Razorpay) ─────────────────────────────────────────────

export interface EnrollConfig {
  enabled: boolean;
  test_mode: boolean;
  fees: { course_id: string; name: string; self_paced: number; mentor_led: number }[];
}

export interface EnrollOrder {
  key_id: string;
  order_id: string;
  /** In paise — the amount the gateway will charge, decided by the server. */
  amount: number;
  currency: string;
  course_name: string;
  plan_name: string;
  /** The list price before any referral discount, in paise. */
  list_amount?: number;
  /** What a referral code took off, in paise. Zero when none applied. */
  referral_discount?: number;
  referral_code?: string;
  prefill: { name: string; email: string; contact: string };
}

export interface EnrollResult {
  status: string;
  email: string;
  course_name: string;
  plan_name: string;
  new_account: boolean;
  emailed: boolean;
}

async function enrollCall<T>(path: string, body?: unknown): Promise<T> {
  const resp = await fetch(`${API_BASE}/api/enroll/${path}`, body === undefined
    ? { cache: 'no-store' }
    : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data?.error || 'Something went wrong. Please try again.');
  return data as T;
}

export const getEnrollConfig = () => enrollCall<EnrollConfig>('config');

export const createEnrollOrder = (p: {
  course_id: string; plan: string; name: string; email: string; phone: string; referral_code?: string;
}) =>
  enrollCall<EnrollOrder>('order', p);

export const verifyEnrollPayment = (p: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
  enrollCall<EnrollResult>('verify', p);

// ── Certification exams ───────────────────────────────────────────────────────
//
// Paid, proctored exams that issue a verifiable certificate. The catalogue is
// live rather than hardcoded: an exam is only listed when its paper is
// published and its window is open, so the site can never sell an exam nobody
// can sit.

export interface CertificationExam {
  slug: string;
  title: string;
  courseId: string;
  summary: string;
  priceRupees: number;
  passPercent: number;
  linkValidDays: number;
  durationMinutes: number;
  totalMarks: number;
  paperTitle: string;
}

export interface CertificationConfig {
  enabled: boolean;
  exams: CertificationExam[];
}

export interface CertificationOrder {
  key_id: string;
  order_id: string;
  amount: number;
  currency: string;
  exam_name: string;
  list_amount?: number;
  referral_discount?: number;
  referral_code?: string;
  prefill: { name: string; email: string; contact: string };
}

export interface CertificationResult {
  status: string;
  email: string;
  exam_name: string;
  /** False when the relay refused the message; staff can resend from the admin panel. */
  emailed: boolean;
  expires_at?: string;
}

export interface CredentialCheck {
  found: boolean;
  credentialId?: string;
  holderName?: string;
  title?: string;
  issuedAt?: string;
  scorePercent?: number;
  revoked?: boolean;
  revokedAt?: string;
  revokeReason?: string;
}

/**
 * Where to reach the gateway for a given call.
 *
 * In the browser a relative path is right: next.config rewrites proxy it in
 * dev, and NEXT_PUBLIC_API_BASE points at the gateway in production. On the
 * server there is no origin to be relative to, so a relative URL simply fails —
 * hence API_TARGET, the same variable the rewrite uses.
 */
function apiBase(): string {
  if (typeof window !== 'undefined') return API_BASE;
  return process.env.API_INTERNAL_BASE || process.env.API_TARGET || API_BASE || 'http://localhost:8080';
}

async function certificationCall<T>(path: string, body?: unknown): Promise<T> {
  const resp = await fetch(`${apiBase()}/api/certification/${path}`, body === undefined
    ? { cache: 'no-store' }
    : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data as T;
}

export const getCertificationConfig = () => certificationCall<CertificationConfig>('config');

export const createCertificationOrder = (p: {
  slug: string; name: string; email: string; phone: string; website?: string; referral_code?: string;
}) =>
  certificationCall<CertificationOrder>('order', p);

export const verifyCertificationPayment = (p: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
  certificationCall<CertificationResult>('verify', p);

/** Public credential lookup — what an employer hits. Never throws for "not found". */
export async function checkCredential(id: string): Promise<CredentialCheck> {
  const resp = await fetch(`${apiBase()}/api/certification/credential?id=${encodeURIComponent(id)}`, { cache: 'no-store' });
  const data = await resp.json().catch(() => ({}));
  if (resp.status === 404) return { found: false };
  if (!resp.ok) throw new Error(data.error || 'Could not check that credential.');
  return data as CredentialCheck;
}

// ── Referrals ─────────────────────────────────────────────────────────────────
//
// A referral code is remembered in a first-party cookie when someone arrives on
// /r/<code>, and travels with the next checkout. The discount it earns is
// priced by the server, never here.

export const REFERRAL_COOKIE = 'knovate_ref';

export interface ReferralConfig {
  active: boolean;
  courseRewardRupees: number;
  examRewardRupees: number;
  friendDiscountPercent: number;
  friendDiscountCapRupees: number;
  minOrderRupees: number;
  attributionDays: number;
  termsUrl: string;
}

export interface ReferralLink {
  code: string;
  link: string;
  name: string;
  created: boolean;
  courseRewardRupees: number;
  examRewardRupees: number;
  friendDiscountPercent: number;
}

export interface ReferralResolve {
  valid: boolean;
  firstName?: string;
  friendDiscountPercent?: number;
  attributionDays?: number;
}

export interface ReferralStatus {
  name: string;
  code: string;
  link: string;
  clicks: number;
  conversions: number;
  earnedRupees: number;
  paidRupees: number;
  pendingRupees: number;
  referrals: {
    friend: string;
    item: string;
    kind: string;
    rewardRupees: number;
    status: string;
    at: string;
    paidAt?: string;
  }[];
}

async function referralCall<T>(path: string, body?: unknown): Promise<T> {
  const resp = await fetch(`${apiBase()}/api/referral/${path}`, body === undefined
    ? { cache: 'no-store' }
    : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data as T;
}

export const getReferralConfig = () => referralCall<ReferralConfig>('config');

export const joinReferralProgram = (p: { name: string; email: string; phone: string; website?: string }) =>
  referralCall<ReferralLink>('join', p);

export const resolveReferralCode = (code: string) =>
  referralCall<ReferralResolve>(`resolve?code=${encodeURIComponent(code)}`);

export const getReferralStatus = (code: string, email: string) =>
  referralCall<ReferralStatus>('status', { code, email });

/** Best effort: a click that fails to record must never block a redirect. */
export const recordReferralClick = (code: string, path: string) =>
  referralCall<{ ok: boolean }>('click', { code, path }).catch(() => ({ ok: false }));

/** The code this visitor arrived with, if any. Read on the client only. */
export function heldReferralCode(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)knovate_ref=([^;]+)/);
  return match ? decodeURIComponent(match[1]).toUpperCase() : '';
}
