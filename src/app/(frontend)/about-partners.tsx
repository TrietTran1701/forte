import React from 'react'

const investors = [
  { src: '/images/about/Logo/Logo%201.png', alt: 'SOSV', width: 103, height: 45 },
  { src: '/images/about/Logo/Logo%202.png', alt: 'HAX', width: 111, height: 52 },
  { src: '/images/about/Logo/Logo%203.png', alt: 'Ascend Vietnam Ventures', width: 128, height: 28 },
  { src: '/images/about/Logo/Logo%204.png', alt: 'DO Ventures', width: 84, height: 68 },
]

const partners = [
  { src: '/images/about/Logo/Logo%205.png', alt: 'Google for Startups', width: 147, height: 32 },
  { src: '/images/about/Logo/Logo%206.png', alt: 'Microsoft for Startups', width: 147, height: 32 },
  { src: '/images/about/Logo/Logo%207.png', alt: 'Wistron', width: 147, height: 32 },
]

function LogoGrid({
  items,
}: {
  items: { src: string; alt: string; width: number; height: number }[]
}) {
  return (
    <ul className="partners__grid">
      {items.map((item) => (
        <li className="partners__card" key={item.alt}>
          <img alt={item.alt} height={item.height} src={item.src} width={item.width} />
        </li>
      ))}
    </ul>
  )
}

export function AboutPartners({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="about-partners-heading" className="partners">
      <div className="partners__copy">
        <div className="partners__intro">
          <p className={`partners__eyebrow ${bodyClassName}`}>Meet Our Partners</p>
          <h2 className="partners__title" id="about-partners-heading">
            Building with trusted partners
          </h2>
        </div>
        <p className={`partners__body ${bodyClassName}`}>
          We are supported by investors and strategic partners who share our belief in a more
          capable and accessible future for robotic operations.
        </p>
      </div>
      <div className="partners__groups">
        <div className="partners__group">
          <h3 className={`partners__label ${bodyClassName}`}>Investors</h3>
          <LogoGrid items={investors} />
        </div>
        <div className="partners__group">
          <h3 className={`partners__label ${bodyClassName}`}>Strategic Partners</h3>
          <LogoGrid items={partners} />
        </div>
      </div>
    </section>
  )
}
