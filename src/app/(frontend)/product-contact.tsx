import React from 'react'

export function ProductContact({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="product-contact-heading" className="contact product-contact" id="contact">
      <img
        alt=""
        className="product-contact__photo"
        height={772}
        src="/images/product/contact-desktop.png"
        width={2037}
      />
      <img
        alt=""
        className="contact__image product-contact__image"
        height={1844}
        src="/images/product/contact.png"
        width={853}
      />
      <div aria-hidden="true" className="contact__shade" />
      <div className="contact__content">
        <div className="contact__copy">
          <h2 className="contact__title" id="product-contact-heading">
            Software Licensing.{' '}
            <br />
            Hardware Rental.
          </h2>
          <p className={`product-contact__body ${bodyClassName}`}>
            Discuss software licensing and hardware rental options based on your mission, site
            conditions, and deployment needs.
          </p>
        </div>
        <div className={`contact__form product-contact__form ${bodyClassName}`}>
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
