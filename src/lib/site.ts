export const siteName = 'Forte'

export const siteHeadline = 'Powering collaborative autonomy for robotic fleets.'

export const siteDescription =
  'We build mission control software delivering co-intelligence and collaborative autonomy to robotic fleets.'

export const siteTitle = `${siteName} — ${siteHeadline}`

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.trim()

  if (configured) return configured.replace(/\/$/, '')

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (productionHost) return `https://${productionHost.replace(/\/$/, '')}`

  const previewHost = process.env.VERCEL_URL?.trim()
  if (previewHost) return `https://${previewHost.replace(/\/$/, '')}`

  return 'http://localhost:3000'
}
