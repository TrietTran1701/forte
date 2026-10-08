export const sitePages = [
  { slug: 'products', label: 'Products', crumb: 'Products' },
  { slug: 'applications', label: 'Applications', crumb: 'Applications' },
  { slug: 'technology', label: 'Technology', crumb: 'Technology' },
  { slug: 'about-us', label: 'About Us', crumb: 'About us' },
  { slug: 'contact', label: 'Contact Us', crumb: 'Contact Us' },
] as const

export type SitePage = (typeof sitePages)[number]

export function getSitePage(slug: string) {
  return sitePages.find((page) => page.slug === slug)
}
