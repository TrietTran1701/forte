import React from 'react'

export function ProductHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero product-hero">
      <div className="product-hero__media">
        <img
          alt=""
          className="product-hero__photo"
          height={941}
          src="/images/product/desktop-hero.png"
          width={1672}
        />
      </div>
      <img
        alt=""
        className="product-hero__image product-hero__mobile"
        height={1844}
        src="/images/product/hero-section.png"
        width={853}
      />
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
