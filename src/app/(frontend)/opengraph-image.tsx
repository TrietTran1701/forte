import { ImageResponse } from 'next/og'

import { siteDescription, siteHeadline, siteName } from '@/lib/site'

export const alt = `${siteName} — ${siteHeadline}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#05070d',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px',
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            display: 'flex',
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          {siteName}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {siteHeadline}
          </div>
          <div
            style={{
              color: '#d4d4d8',
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.4,
              marginTop: 28,
              maxWidth: 860,
            }}
          >
            {siteDescription}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
