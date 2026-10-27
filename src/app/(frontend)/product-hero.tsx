import React from 'react'

export function ProductHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero product-hero">
      <link
        rel="preload"
        as="image"
        href="/images/product/hero-desktop.webp"
        type="image/webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/product/hero-mobile.webp"
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <div className="product-hero__media">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/product/hero-desktop.webp"
            type="image/webp"
          />
          <img
            alt=""
            className="product-hero__photo"
            fetchPriority="high"
            height={1844}
            src="/images/product/hero-mobile.webp"
            width={853}
          />
        </picture>
      </div>
      <div className="hero__copy">
        <div className="hero__text product-hero__text">
          <p className={`product-hero__eyebrow ${bodyClassName}`}>Products</p>
          <h1>One mission. A coordinated fleet.</h1>
          <p className={bodyClassName}>
            Intelligent mission control, autonomous drones, and wireless charging. Designed to work
            together.
          </p>
        </div>
        <a className={`hero__cta ${bodyClassName}`} href="/contact">
          Get a Demo
        </a>
      </div>
    </section>
  )
}
