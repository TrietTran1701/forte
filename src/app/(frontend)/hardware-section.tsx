import React from 'react'

const hardwareDesktop = [
  {
    src: '/images/product/hardware-desktop-1.png',
    alt: 'Autonomous drones parked on a wet landing surface at sunset',
    width: 1507,
    height: 1044,
    title: 'Native Autonomous Drones',
    description: 'Fleets purpose-built for seamless software integration.',
    crop: 'hardware__photo--drones',
  },
  {
    src: '/images/product/hardware-desktop-2.png',
    alt: 'A drone resting on a circular landing pad',
    width: 1578,
    height: 997,
    title: 'Next-Gen Landing Pads',
    description: 'Ultra-light design with automated, rapid wireless charging.',
    crop: 'hardware__photo--pads',
  },
]

const hardwareCards = [
  {
    src: '/images/product/hardware-1.png',
    alt: 'Autonomous drones parked on a wet landing surface at sunset',
    width: 1507,
    height: 1044,
    label: 'Native Autonomous Drones.',
    description: 'Fleets purpose-built for seamless software integration.',
  },
  {
    src: '/images/product/hardware-2.png',
    alt: 'A drone resting on a circular landing pad',
    width: 1578,
    height: 997,
    label: 'Native Autonomous Drones.',
    description: 'Fleets purpose-built for seamless software integration.',
    framed: true,
  },
]

export function HardwareSection({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="hardware-heading" className="product hardware">
      <div className="product__copy">
        <div className="product__intro">
          <p className={`product__eyebrow ${bodyClassName}`}>Integrated Hardware</p>
          <h2 className="product__title" id="hardware-heading">
            Built to work together, from flight to charging
          </h2>
        </div>
        <p className={`product__body ${bodyClassName}`}>
          Purpose-built drones and lightweight landing pads support the mission control software as
          part of a connected operational system.
        </p>
      </div>
      <div className="hardware__list">
        {hardwareCards.map((card) => (
          <article className="hardware__card" key={card.src}>
            <div className="hardware__media">
              <img
                alt={card.alt}
                className={card.framed ? 'hardware__image hardware__image--framed' : 'hardware__image'}
                height={card.height}
                src={card.src}
                width={card.width}
              />
            </div>
            <p className={`hardware__caption ${bodyClassName}`}>
              <span className="hardware__label">{card.label}</span> {card.description}
            </p>
          </article>
        ))}
      </div>
      <div className="hardware__desktop">
        <div className="hardware__heading">
          <p className={`hardware__pill ${bodyClassName}`}>Integrated Hardware</p>
          <h2 className="hardware__title">Built to work together, from flight to charging</h2>
          <p className={`hardware__lead ${bodyClassName}`}>
            Purpose-built drones and lightweight landing pads support the mission control software as
            part of a connected operational system.
          </p>
        </div>
        <div className="hardware__grid">
          {hardwareDesktop.map((card) => (
            <article className="hardware__tile" key={card.src}>
              <img
                alt={card.alt}
                className={`hardware__photo ${card.crop}`}
                height={card.height}
                src={card.src}
                width={card.width}
              />
              <div className={`hardware__overlay ${bodyClassName}`}>
                <h3 className="hardware__name">{card.title}</h3>
                <p className="hardware__detail">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
