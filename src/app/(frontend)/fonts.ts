import localFont from 'next/font/local'

// Self-hosted so production builds do not depend on Google Fonts CSS.
// Google sometimes returns extensionless font URLs that Next.js 16 cannot parse.
export const bodyFont = localFont({
  src: './fonts/google-sans-flex-latin.woff2',
  weight: '400 600',
  display: 'swap',
})

export const displayFont = localFont({
  src: './fonts/wix-madefor-display-latin.woff2',
  weight: '400 600',
  display: 'swap',
})
