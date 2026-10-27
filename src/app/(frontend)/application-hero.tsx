import React from 'react'

export function ApplicationHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero application-hero">
      <link
        rel="preload"
        as="image"
        href="/images/application/hero-desktop.webp"
        type="image/webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/application/hero-mobile.webp"
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <div className="application-hero__media">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/application/hero-desktop.webp"
            type="image/webp"
          />
          <img
            alt=""
            className="application-hero__photo"
            fetchPriority="high"
            height={812}
            src="/images/application/hero-mobile.webp"
            width={375}
          />
        </picture>
      </div>
      <div className="hero__copy">
        <div className="hero__text application-hero__text">
          <p className={`application-hero__eyebrow ${bodyClassName}`}>Applications</p>
          <h1>Drone fleets for security and response.</h1>
          <p className={bodyClassName}>
            Forte combines collaborative drone autonomy with AI-assisted visual analysis to support
            teams on the ground.
          </p>
        </div>
        <a className={`hero__cta ${bodyClassName}`} href="/contact">
          Get a Demo
        </a>
      </div>
    </section>
  )
}
