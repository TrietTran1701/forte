import React from 'react'

import { getSiteUrl, siteDescription, siteHeadline, siteName, siteTitle } from '@/lib/site'

import { AboutDesktop } from './about-desktop'
import { CardCarousel } from './card-carousel'
import { HeroFit } from './hero-fit'
import { CustomersCarousel } from './customers-carousel'
import { CustomersDesktop } from './customers-desktop'
import { bodyFont, displayFont } from './fonts'
import { ProductCarousel } from './product-carousel'
import { ProductDesktop } from './product-desktop'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { SiteLogo } from './site-logo'
import { sitePages } from './site-nav'
import './styles.css'

const desktopNav = sitePages.filter(
  (page) => page.slug !== 'contact' && page.slug !== 'technology',
)
const heroDescription = siteDescription.split(/(?<=delivering )/)

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
    <div className={`empty-stage empty-stage--home ${displayFont.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader bodyClassName={bodyFont.className} compactActions="past-hero">
        <SiteLogo />
        <div className="empty-stage__actions">
          <nav aria-label="Primary" className={bodyFont.className}>
            <ul className="empty-stage__nav">
              {desktopNav.map((page) => (
                <li key={page.slug}>
                  <a href={`/${page.slug}`}>{page.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className={`empty-stage__contact ${bodyFont.className}`} href="/contact">
            Contact Us
          </a>
        </div>
      </SiteHeader>
      <HeroFit />
      <section className="hero home-hero">
        <div className="home-hero__media">
          <img
            alt=""
            className="hero__image"
            height={1058}
            src="/images/Desktop_Hero%20Section.png"
            width={1487}
          />
          <div aria-hidden="true" className="home-hero__veil" />
        </div>
        <img
          alt=""
          className="hero__image home-hero__mobile"
          height={812}
          src="/images/Hero%20Section.png"
          width={375}
        />
        <div className="hero__copy">
          <div className="hero__text">
            <h1>{siteHeadline}</h1>
            <p className={bodyFont.className}>
              {heroDescription[0]}
              <br className="home-hero__break" />
              {heroDescription[1]}
            </p>
          </div>
          <a className={`hero__cta ${bodyFont.className}`} href="#contact">
            Get a Demo
          </a>
        </div>
      </section>
      <section aria-labelledby="about-heading" className="about">
        <AboutDesktop bodyClassName={bodyFont.className} />
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
      <section aria-labelledby="product-heading" className="product">
        <ProductDesktop bodyClassName={bodyFont.className} />
        <div className="product__copy">
          <div className="product__intro">
            <p className={`product__eyebrow ${bodyFont.className}`}>Industry solutions</p>
            <h2 className="product__title" id="product-heading">
              One mission. Multiple drones. AI-assisted control.
            </h2>
          </div>
          <p className={`product__body ${bodyFont.className}`}>
            Forte brings intelligent{' '}
            <span className="product__emphasis">surveillance software and autonomous</span> drones
            together in one platform, enabling teams to coordinate{' '}
            <span className="product__emphasis">multi-drone missions</span>, monitor complex sites, and
            respond faster with <span className="product__emphasis">AI-supported analysis.</span>
          </p>
        </div>
        <ProductCarousel bodyClassName={bodyFont.className} />
      </section>
      <section aria-labelledby="customers-heading" className="customers">
        <CustomersDesktop bodyClassName={bodyFont.className} />
        <div className="customers__copy">
          <div className="customers__intro">
            <p className={`customers__eyebrow ${bodyFont.className}`}>Who we serve</p>
            <h2 className="customers__title" id="customers-heading">
              One platform. Different needs.
            </h2>
          </div>
          <p className={`customers__body ${bodyFont.className}`}>
            Forte adapts to <span className="customers__emphasis">every environment</span>, making
            security smarter, faster, and more efficient.
          </p>
        </div>
        <CustomersCarousel bodyClassName={bodyFont.className} />
      </section>
      <section aria-labelledby="contact-heading" className="contact" id="contact">
        <img
          alt=""
          className="contact__photo"
          height={941}
          src="/images/home/contact-desktop.png"
          width={1672}
        />
        <img
          alt=""
          className="contact__image"
          height={1672}
          src="/images/contact.png"
          width={941}
        />
        <div aria-hidden="true" className="contact__shade" />
        <div className="contact__content">
          <div className="contact__copy">
            <div className="contact__intro">
              <p className={`contact__eyebrow ${bodyFont.className}`}>Request a demo</p>
              <h2 className="contact__title" id="contact-heading">
                See Forte in action
              </h2>
            </div>
            <ul className={`contact__benefits ${bodyFont.className}`}>
              <li>24/7 autonomous monitoring</li>
              <li>Real-time alerts & visibility</li>
              <li>Scalable site protection</li>
              <li>Expert support</li>
            </ul>
          </div>
          <div className={`contact__form ${bodyFont.className}`}>
            <label className="contact__field">
              <img alt="" className="contact__mail" height={20} src="/mail.svg" width={20} />
              <input aria-label="Work email address" placeholder="Work email address" type="email" />
            </label>
            <button className="contact__submit" type="button">
              Get a Demo
            </button>
          </div>
        </div>
      </section>
      <SiteFooter bodyClassName={bodyFont.className} />
    </div>
  )
}
