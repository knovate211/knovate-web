# Knovate — Marketing Website

The public marketing site for the Knovate learning platform. Built with **Next.js
(App Router) + TypeScript + Tailwind**, statically generated for SEO and speed.
Contact/enquiry forms post to the platform's public `POST /api/inquiries`
endpoint, and submissions appear in the **admin panel** under *Enquiries*.

## Pages
Home · Courses (+ 9 course detail pages) · Pricing · Placements · About ·
Contact · Blog (+ posts) · sitemap.xml · robots.txt · 404.

## Develop
```bash
npm install
npm run dev            # http://localhost:3000
```
`next.config.mjs` proxies `/api/*` → `API_TARGET` (default `http://localhost:8080`),
so the enquiry form works against a locally-running backend with no CORS setup.
Config lives in `.env.local`.

## Lead capture
- One `<EnquiryForm source="...">` component posts `{name,email,phone,interest,
  message,source,page_url}` to `/api/inquiries`.
- `source` tags the origin (`home_hero`, `course_<slug>`, `pricing`, `contact`);
  `interest` is the course; `page_url` is captured client-side.
- View submissions in the admin panel → **Enquiries** (`GET /api/admin/inquiries`).

## Content
All content is hardcoded in `src/data/*` (courses, testimonials, pricing, posts,
site). Edit those files to update copy. Swap for a CMS later if needed.

## Build & deploy (Netlify)
```bash
npm run build          # static export via Next
```
`netlify.toml` uses `@netlify/plugin-nextjs`. Set the environment variables noted
in that file — the recommended setup keeps the form same-origin via `API_TARGET`
(no CORS change needed on the backend).

## Placeholders to replace before launch
Course descriptions, pricing (₹ values), testimonials, partner names, stats, blog
posts, contact details (`src/data/site.ts`), and the Knovate logo (currently a
text wordmark in `Navbar`/`Footer`).
