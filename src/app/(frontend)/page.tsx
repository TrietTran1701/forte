import { Google_Sans_Flex, Wix_Madefor_Display } from 'next/font/google'
import React from 'react'

import { getSiteUrl, siteDescription, siteHeadline, siteName, siteTitle } from '@/lib/site'

import { CardCarousel } from './card-carousel'
import { SiteHeader } from './site-header'
import './styles.css'

const bodyFont = Google_Sans_Flex({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const displayFont = Wix_Madefor_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const navItems = ['Products', 'Applications', 'Technology', 'About Us']

const siteUrl = getSiteUrl()

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      description: siteDescription,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
  ],
}

export default function HomePage() {
  return (
    <div className={`empty-stage ${displayFont.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader bodyClassName={bodyFont.className}>
        <img alt="Forte" className="empty-stage__logo" height={44} src="/logo.svg" width={44} />
        <div className="empty-stage__actions">
          <nav aria-label="Primary" className={bodyFont.className}>
            <ul className="empty-stage__nav">
              {navItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </nav>
          <button className={`empty-stage__contact ${bodyFont.className}`} disabled type="button">
            Contact Us
          </button>
        </div>
      </SiteHeader>
      <section className="hero">
        <img
          alt=""
          className="hero__image"
          height={812}
          src="/images/Hero%20Section.png"
          width={375}
        />
        <div className="hero__copy">
          <div className="hero__text">
            <h1>{siteHeadline}</h1>
            <p className={bodyFont.className}>{siteDescription}</p>
          </div>
          <button className={`hero__cta ${bodyFont.className}`} type="button">
            Get a Demo
          </button>
        </div>
      </section>
      <section aria-labelledby="about-heading" className="about">
        <div className="about__copy">
          <div className="about__intro">
            <p className={`about__eyebrow ${bodyFont.className}`}>Key Benefits</p>
            <h2 className="about__title" id="about-heading">
              Intelligent control for autonomous operations.
            </h2>
          </div>
          <p className={`about__body ${bodyFont.className}`}>
            Forte combines intelligent <span className="about__emphasis">mission control</span> with{' '}
            <span className="about__emphasis">autonomous drone fleets</span> to help security teams see
            more, <span className="about__emphasis">coordinate faster</span>, and operate with{' '}
            <span className="about__emphasis">greater control</span>.
          </p>
        </div>
        <CardCarousel bodyClassName={bodyFont.className} />
      </section>
      <section className="empty-stage__content">
        <img
          alt=""
          className="empty-stage__illustration"
          height={448}
          src="/images/Empty%20Stage%20(Desktop).png.png"
          width={384}
        />
        <div className="empty-stage__copy">
          <h1>Page Under Construction</h1>
          <p>
            We’re working on something great.
            <br />
            Please check back later.
          </p>
        </div>
      </section>
    </div>
  )
}
