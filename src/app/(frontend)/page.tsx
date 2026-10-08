import React from 'react'

import { getSiteUrl, siteDescription, siteHeadline, siteName, siteTitle } from '@/lib/site'

import { CardCarousel } from './card-carousel'
import { CustomersCarousel } from './customers-carousel'
import { bodyFont, displayFont } from './fonts'
import { ProductCarousel } from './product-carousel'
import { SiteHeader } from './site-header'
import { sitePages } from './site-nav'
import './styles.css'

const desktopNav = sitePages.filter((page) => page.slug !== 'contact')

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
        <a className="empty-stage__home" href="/">
          <img alt="Forte" className="empty-stage__logo" height={44} src="/logo.svg" width={44} />
        </a>
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
          <a className={`hero__cta ${bodyFont.className}`} href="#contact">
            Get a Demo
          </a>
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
      <section aria-labelledby="product-heading" className="product">
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
      <footer className={`footer ${bodyFont.className}`}>
        <div className="footer__main">
          <div className="footer__brand">
            <img
              alt="Forte"
              className="footer__logo"
              height={36}
              src="/images/footer-wordmark.png"
              width={108}
            />
            <p className="footer__tagline">
              Southeast Asia’s leading provider of autonomous drone-based security systems
            </p>
          </div>
          <div className="footer__nav">
            <div className="footer__columns">
              <div className="footer__column">
                <p className="footer__heading">Product</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="footer__link" href="#product-heading">
                      Overview
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="footer__link" href="#product-heading">
                      Solutions
                    </a>
                    <span className="footer__badge">New</span>
                  </li>
                </ul>
              </div>
              <div className="footer__column">
                <p className="footer__heading">Company</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="footer__link" href="#about-heading">
                      About us
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="footer__link" href="#contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__column">
              <p className="footer__heading">Social</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="footer__link" href="#linkedin">
                    LinkedIn
                  </a>
                </li>
                <li className="footer__item">
                  <a className="footer__link" href="#facebook">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bar">
          <div className="footer__bar-inner">
            <div className="footer__social">
              <a aria-label="LinkedIn" className="footer__icon-link" href="#linkedin">
                <img alt="" className="footer__icon" height={24} src="/linkedin.svg" width={24} />
              </a>
              <a aria-label="Facebook" className="footer__icon-link" href="#facebook">
                <img alt="" className="footer__icon" height={24} src="/facebook.svg" width={24} />
              </a>
            </div>
            <p className="footer__legal">© 2026 Forte. All rights reserved.</p>
          </div>
        </div>
      </footer>
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
