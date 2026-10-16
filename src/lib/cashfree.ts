// Cashfree checkout, shared by course enrolment and certification exams.
//
// The browser's only job is to show Cashfree's payment window for a session
// the server created. It never decides whether a payment counted: once the
// window closes the caller asks the server, which asks Cashfree.

type CashfreeResult = {
  error?: { message?: string };
  redirect?: boolean;
  paymentDetails?: { paymentMessage?: string };
};

type CashfreeInstance = {
  checkout: (opts: { paymentSessionId: string; redirectTarget: '_modal' | '_self' }) => Promise<CashfreeResult>;
};

declare global {
  interface Window {
    Cashfree?: (opts: { mode: 'sandbox' | 'production' }) => CashfreeInstance;
  }
}

// Loaded once, only when someone is ready to pay.
export function loadCashfree(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.Cashfree) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load the payment window. Check your connection and try again.'));
    document.body.appendChild(s);
  });
}

/**
 * Opens checkout in a pop-up and resolves when it closes.
 *
 * "finished" means the student went through checkout and the server should be
 * asked whether the money arrived; "closed" means they dismissed it or the
 * payment failed, with Cashfree's reason when it gave one.
 */
export async function openCashfreeCheckout(
  sessionId: string,
  mode: string,
): Promise<{ outcome: 'finished' } | { outcome: 'closed'; message: string }> {
  await loadCashfree();
  const cashfree = window.Cashfree!({ mode: mode === 'production' ? 'production' : 'sandbox' });
  const result = await cashfree.checkout({ paymentSessionId: sessionId, redirectTarget: '_modal' });
  if (result.error) {
    return { outcome: 'closed', message: result.error.message || '' };
  }
  return { outcome: 'finished' };
}

/**
 * The order id Cashfree hands back in the return URL when checkout had to leave
 * the page (some bank and UPI flows do), so the form can finish the job.
 */
export function returnedOrderId(prefix: 'enr_' | 'cert_'): string {
  if (typeof window === 'undefined') return '';
  const id = new URLSearchParams(window.location.search).get('cf_order') || '';
  return id.startsWith(prefix) ? id : '';
}
