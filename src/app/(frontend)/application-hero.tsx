import React from 'react'

export function ApplicationHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section className="hero application-hero">
      <img
        alt=""
        className="hero__image"
        height={812}
        src="/images/application/Mobile_Hero%20Section.png"
        width={375}
      />
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
