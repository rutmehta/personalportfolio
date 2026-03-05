import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rut Mehta — Founder, Engineer, Researcher';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Rut Mehta
        </div>
        <div
          style={{
            color: '#737373',
            fontSize: 28,
            letterSpacing: '0.05em',
          }}
        >
          founder / engineer / researcher
        </div>
        <div
          style={{
            color: '#525252',
            fontSize: 20,
            marginTop: 32,
          }}
        >
          Building for humanity. AI at Endex.ai.
        </div>
      </div>
    ),
    { ...size }
  );
}
