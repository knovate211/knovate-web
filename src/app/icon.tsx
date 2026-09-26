import { ImageResponse } from 'next/og';

// The browser-tab and search-result favicon: the K mark on the brand gold.
export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#c98a3a',
          color: '#fff',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          borderRadius: 6,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
