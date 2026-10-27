import React from 'react'

export function AboutHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero about-hero">
      <link
        rel="preload"
        as="image"
        href="/images/about/hero-desktop.webp"
        type="image/webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/about/hero-mobile.webp"
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <div className="about-hero__media">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/about/hero-desktop.webp" type="image/webp" />
          <img
            alt=""
            className="about-hero__photo"
            fetchPriority="high"
            height={812}
            src="/images/about/hero-mobile.webp"
            width={375}
          />
        </picture>
      </div>
      <div className="hero__copy">
        <div className="hero__text about-hero__text">
          <p className={`about-hero__eyebrow ${bodyClassName}`}>About Forte</p>
          <h1>Unlocking the potential of accessible robotics.</h1>
          <p className={bodyClassName}>
            To unlock the full potential of accessible robotics, bringing forth a future where fully
            autonomous, multi-agent systems collaborate seamlessly to serve human needs.
          </p>
        </div>
        <a className={`hero__cta ${bodyClassName}`} href="#about">
          Learn More
        </a>
      </div>
    </section>
  )
}
