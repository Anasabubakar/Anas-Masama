import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Anas Abubakar Masama — Software Engineer & AI Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0ea5a4, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            A
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
            }}
          >
            anasmasama.dev
          </span>
        </div>

        <h1
          style={{
            color: 'white',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: '0 0 24px 0',
            maxWidth: '900px',
          }}
        >
          Anas Abubakar Masama
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '28px',
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
            maxWidth: '800px',
          }}
        >
          Software Engineer &amp; AI Developer
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['Next.js', 'TypeScript', 'React', 'AI/ML', 'Firebase'].map(
            (skill) => (
              <span
                key={skill}
                style={{
                  color: '#0ea5a4',
                  fontSize: '16px',
                  fontWeight: 600,
                  border: '1px solid rgba(14, 165, 164, 0.3)',
                  borderRadius: '9999px',
                  padding: '8px 20px',
                  background: 'rgba(14, 165, 164, 0.1)',
                }}
              >
                {skill}
              </span>
            )
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '16px',
          }}
        >
          Lagos, Nigeria · Founder of TeenovateX Labs
        </div>
      </div>
    ),
    { ...size }
  );
}
