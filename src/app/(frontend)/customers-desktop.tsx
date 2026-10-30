import React from 'react'

type CustomerCard = {
  src: string
  width: number
  height: number
  alt: string
  title: string
  description: string
}

const customerCards: CustomerCard[] = [
  {
    src: '/images/home/customer-residential.png',
    width: 1415,
    height: 1890,
    alt: 'Drone and cameras watching a gated residential street at night',
    title: 'Residential.',
    description: 'Smarter community protection. 24/7 automated patrols for safer communities.',
  },
  {
    src: '/images/home/customer-industrial.png',
    width: 1415,
    height: 1890,
    alt: 'Drone and cameras monitoring a warehouse loading yard',
    title: 'Industrial.',
    description: 'Secure large-scale sites. Monitor assets, perimeters, and critical areas.',
  },
  {
    src: '/images/home/customer-public.png',
    width: 1415,
    height: 1890,
    alt: 'Drone and cameras over a civic plaza and public building',
    title: 'Public & Institutional.',
    description: 'Security without disruption. Continuous monitoring for sensitive environments.',
  },
  {
    src: '/images/home/customer-security.png',
    width: 1415,
    height: 1890,
    alt: 'Security operators watching drone feeds in a control room',
    title: 'Security Companies.',
    description: 'Scale your security services. Add smart drone protection to your operations.',
  },
]

export function CustomersDesktop({ bodyClassName }: { bodyClassName: string }) {
  return (
    <div className="customers__desktop">
      <div className="customers__heading">
        <p className={`customers__pill ${bodyClassName}`}>Who we serve</p>
        <h2 className="customers__title">One platform. Different needs.</h2>
        <p className={`customers__body ${bodyClassName}`}>
          Forte adapts to every environment, making security smarter, faster, and more efficient.
        </p>
      </div>
      <div className="customers-grid">
        {customerCards.map((card) => (
          <article className="customers-grid__card" key={card.title}>
            <div className="customers-grid__media">
              <img
                alt={card.alt}
                className="customers-grid__image"
                height={card.height}
                src={card.src}
                width={card.width}
              />
            </div>
            <p className={`customers-grid__caption ${bodyClassName}`}>
              <span className="customers-grid__label">{card.title}</span>{' '}
              <span className="customers-grid__detail">{card.description}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
