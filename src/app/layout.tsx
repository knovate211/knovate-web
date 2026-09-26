import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { site } from '@/data/site';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import ReferralBanner from '@/components/referral/ReferralBanner';
import './globals.css';

const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once Search Console gives you the
  // code; without it the tag is simply absent.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Organization markup is how a brand gets a knowledge panel and how Google
// links a site to its social profiles. It lives in the layout because it
// describes the company, not any one page.
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: site.name,
  url: siteUrl,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: { '@type': 'PostalAddress', addressLocality: site.location, addressCountry: 'IN' },
  sameAs: Object.values(site.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {/* Renders only while a referral code is held. */}
        <ReferralBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
