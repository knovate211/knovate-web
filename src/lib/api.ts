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

export const createEnrollOrder = (p: { course_id: string; plan: string; name: string; email: string; phone: string }) =>
  enrollCall<EnrollOrder>('order', p);

export const verifyEnrollPayment = (p: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
  enrollCall<EnrollResult>('verify', p);
