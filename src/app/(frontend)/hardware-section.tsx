import React from 'react'

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
    </section>
  )
}
