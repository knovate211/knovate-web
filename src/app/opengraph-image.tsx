import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

// Generated at build rather than shipped as a file, so the card can never drift
// from the brand colours or the tagline in data/site.ts.
export const runtime = 'edge';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #f7f3ec 0%, #efe7d8 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 56, background: '#c98a3a', borderRadius: 12 }} />
          <div style={{ fontSize: 44, fontWeight: 700, color: '#2b2620' }}>{site.name}</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 68, lineHeight: 1.1, color: '#2b2620', maxWidth: 900 }}>
          Learn. Build. Grow.
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: '#6c6455', maxWidth: 820 }}>
          Mentor-led tech courses, real projects and placement support.
        </div>
        <div style={{ marginTop: 'auto', fontSize: 24, color: '#b5701f' }}>knovate.com</div>
      </div>
    ),
    size,
  );
}
