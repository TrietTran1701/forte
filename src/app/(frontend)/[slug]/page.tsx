import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { bodyFont, displayFont } from '../fonts'
import { SiteHeader } from '../site-header'
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
    description: 'We’re working on something great. Please check back later.',
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

  return (
    <div className={`empty-stage empty-stage--fit ${displayFont.className}`}>
      <SiteHeader bodyClassName={bodyFont.className} showMenu={false} solid>
        <a className="empty-stage__home" href="/">
          <img alt="Forte" className="empty-stage__logo" height={44} src="/logo.svg" width={44} />
        </a>
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
        <div className={`construction-header__actions ${bodyFont.className}`}>
          <a className="construction-header__explore" href="/">
            Explore
          </a>
          <a className="construction-header__contact" href="/#contact-email">
            Contact
          </a>
        </div>
      </SiteHeader>
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
