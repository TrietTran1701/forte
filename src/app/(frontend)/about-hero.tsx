import React from 'react'

export function AboutHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero about-hero">
      <div className="about-hero__media">
        <img
          alt=""
          className="about-hero__photo"
          height={907}
          src="/images/about/desktop-hero.png"
          width={1733}
        />
      </div>
      <img
        alt=""
        className="hero__image about-hero__mobile"
        height={812}
        src="/images/about/Mobile_Hero%20Section.png"
        width={375}
      />
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
