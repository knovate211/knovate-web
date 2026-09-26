import Script from 'next/script';

/**
 * Google Analytics 4, loaded only when NEXT_PUBLIC_GA_ID is set.
 *
 * Unset in development and in any deploy that has not been given an id, so
 * local clicks never pollute the numbers and the site ships no third-party
 * script by default.
 *
 * `afterInteractive` keeps it off the critical path: analytics must never be
 * what delays a page for someone on a slow connection.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
