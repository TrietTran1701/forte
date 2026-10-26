import React from 'react'

export function ApplicationContact({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="application-contact-heading" className="app-contact" id="contact">
      <div className="app-contact__content">
        <div className="app-contact__heading">
          <img alt="" className="app-contact__mark" height={48} src="/logo-light.svg" width={48} />
          <div className="app-contact__copy">
            <div className="app-contact__intro">
              <p className={`app-contact__eyebrow ${bodyClassName}`}>Request a demo</p>
              <h2 className="app-contact__title" id="application-contact-heading">
                Bring your mission to Forte
              </h2>
            </div>
            <p className={`app-contact__body ${bodyClassName}`}>
              Tell us about your site, operating environment, and team’s needs. Explore how
              coordinated drone fleets could support your operations.
            </p>
          </div>
        </div>
        <form className={`contact__form app-contact__form ${bodyClassName}`} action="/contact">
          <label className="contact__field">
            <img alt="" className="contact__mail" height={20} src="/mail.svg" width={20} />
            <input aria-label="Work email address" placeholder="Work email address" type="email" />
          </label>
          <button className="contact__submit" type="submit">
            Get a Demo
          </button>
        </form>
      </div>
    </section>
  )
}
