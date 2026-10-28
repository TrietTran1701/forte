import React from 'react'

export function ContactHero({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="contact-hero-heading" className="hero contact-hero">
      <link
        rel="preload"
        as="image"
        href="/images/home/contact-desktop.png"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/contact.png"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <div className="contact-hero__media">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/home/contact-desktop.png"
            type="image/png"
          />
          <img
            alt=""
            className="contact-hero__photo"
            fetchPriority="high"
            height={1672}
            src="/images/contact.png"
            width={941}
          />
        </picture>
      </div>
      <div aria-hidden="true" className="contact-hero__shade" />
      <div className="hero__copy">
        <div className="contact__copy">
          <div className="contact__intro">
            <p className={`contact__eyebrow ${bodyClassName}`}>Request a demo</p>
            <h1 className="contact__title" id="contact-hero-heading">
              See Forte in action
            </h1>
          </div>
          <ul className={`contact__benefits ${bodyClassName}`}>
            <li>24/7 autonomous monitoring</li>
            <li>Real-time alerts & visibility</li>
            <li>Scalable site protection</li>
            <li>Expert support</li>
          </ul>
        </div>
        <div className={`contact__form ${bodyClassName}`}>
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
  )
}
