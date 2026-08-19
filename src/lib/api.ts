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
