import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { bodyFont, displayFont } from '../fonts'
import { HeroFit } from '../hero-fit'
import { AboutHero } from '../about-hero'
import { AboutPartners } from '../about-partners'
import { AboutTeam } from '../about-team'
import { ApplicationContact } from '../application-contact'
import { ApplicationCustomers } from '../application-customers'
import { ApplicationHero } from '../application-hero'
import { ApplicationResponse } from '../application-response'
import { ProductHero } from '../product-hero'
import { SoftwareSection } from '../software-section'
import { HardwareSection } from '../hardware-section'
import { ProductContact } from '../product-contact'
import { SiteFooter } from '../site-footer'
import { SiteHeader } from '../site-header'
import { SiteLogo } from '../site-logo'
import { getSitePage, sitePages } from '../site-nav'
import '../styles.css'

export const dynamicParams = false

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getSitePage(slug)

  if (!page) return {}

  return {
    title: page.crumb,
    description:
      slug === 'products'
        ? 'Intelligent mission control, autonomous drones, and wireless charging. Designed to work together.'
        : slug === 'applications'
          ? 'Forte combines collaborative drone autonomy with AI-assisted visual analysis to support teams on the ground.'
          : slug === 'about-us'
            ? 'To unlock the full potential of accessible robotics, bringing forth a future where fully autonomous, multi-agent systems collaborate seamlessly to serve human needs.'
            : 'We’re working on something great. Please check back later.',
  }
}

export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getSitePage(slug)

  if (!page) notFound()

  const desktopNav = sitePages.filter((item) => item.slug !== 'contact')
  const isProducts = slug === 'products'
  const isApplications = slug === 'applications'
  const isAbout = slug === 'about-us'
  const hasHero = isProducts || isApplications || isAbout

  return (
    <div className={`empty-stage${hasHero ? '' : ' empty-stage--fit'} ${displayFont.className}`}>
      {hasHero ? <HeroFit /> : null}
      <SiteHeader
        bodyClassName={bodyFont.className}
        compactActions={hasHero ? 'past-hero' : 'always'}
        showMenu={hasHero}
        solid={!hasHero}
      >
        <SiteLogo />
        <div className="empty-stage__actions">
          <nav aria-label="Primary" className={bodyFont.className}>
            <ul className="empty-stage__nav">
              {desktopNav.map((item) => (
                <li key={item.slug}>
                  <a href={`/${item.slug}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <button className={`empty-stage__contact ${bodyFont.className}`} disabled type="button">
            Contact Us
          </button>
        </div>
      </SiteHeader>
      {isProducts ? <ProductHero bodyClassName={bodyFont.className} /> : null}
      {isApplications ? <ApplicationHero bodyClassName={bodyFont.className} /> : null}
      {isAbout ? <AboutHero bodyClassName={bodyFont.className} /> : null}
      {isAbout ? <AboutTeam bodyClassName={bodyFont.className} /> : null}
      {isAbout ? <AboutPartners bodyClassName={bodyFont.className} /> : null}
      {isApplications ? <ApplicationCustomers bodyClassName={bodyFont.className} /> : null}
      {isApplications ? <ApplicationResponse bodyClassName={bodyFont.className} /> : null}
      {isApplications ? <ApplicationContact bodyClassName={bodyFont.className} /> : null}
      {isProducts ? <SoftwareSection bodyClassName={bodyFont.className} /> : null}
      {isProducts ? <HardwareSection bodyClassName={bodyFont.className} /> : null}
      {isProducts ? <ProductContact bodyClassName={bodyFont.className} /> : null}
      {hasHero ? null : (
        <section className="construction">
          <nav aria-label="Breadcrumb" className={`construction__crumb ${bodyFont.className}`}>
            <a href="/">Home</a>
            <img alt="" height={24} src="/chevron-right.svg" width={24} />
            <span aria-current="page">{page.crumb}</span>
          </nav>
          <div className="construction__art">
            <img
              alt=""
              className="construction__illustration"
              height={307}
              src="/images/Empty%20Stage%20(Mobile).png.png"
              width={263}
            />
          </div>
          <div className="construction__copy">
            <h1>Page Under Construction</h1>
            <p className={bodyFont.className}>
              We’re working on something great.
              <br />
              Please check back later.
            </p>
          </div>
          <a className={`construction__return ${bodyFont.className}`} href="/">
            Return to Home
          </a>
        </section>
      )}
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
      <SiteFooter bodyClassName={bodyFont.className} swapped={isAbout} />
    </div>
  )
}
