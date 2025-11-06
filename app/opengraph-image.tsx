import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MJ Carnaje - Web Developer, Mobile Developer, Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            zIndex: 0,
          }}
        />

        {/* Decorative circle - top right */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Decorative circle - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
              }}
            >
              💻
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1f2937',
              lineHeight: 1.2,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            <span>Web Developer,</span>
            <span>Mobile Developer,</span>
            <span>Full-Stack Developer.</span>
          </div>

          {/* Description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '28px',
              color: '#6b7280',
              lineHeight: 1.5,
              maxWidth: '800px',
              marginBottom: '32px',
            }}
          >
            <span>
              Hello! I'm <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Michael James Carnaje</span>, a proficient
            </span>
            <span>Web and Mobile Developer from the Philippines.</span>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              color: '#9ca3af',
            }}
          >
            <span>mjcarnaje.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
