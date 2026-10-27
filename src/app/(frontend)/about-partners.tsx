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

type DesktopLogo = {
  src: string
  alt: string
  width: number
  height: number
  frame: 'sosv' | 'hax' | 'ascend' | 'do' | 'wide'
}

const desktopInvestors: DesktopLogo[] = [
  {
    src: '/images/about/desktop-logo-sosv.png',
    alt: 'SOSV',
    width: 1771,
    height: 767,
    frame: 'sosv',
  },
  {
    src: '/images/about/desktop-logo-hax.png',
    alt: 'HAX',
    width: 1004,
    height: 468,
    frame: 'hax',
  },
  {
    src: '/images/about/desktop-logo-ascend.png',
    alt: 'Ascend Vietnam Ventures',
    width: 1774,
    height: 887,
    frame: 'ascend',
  },
  {
    src: '/images/about/desktop-logo-do.png',
    alt: 'DO Ventures',
    width: 1254,
    height: 1254,
    frame: 'do',
  },
]

const desktopPartners: DesktopLogo[] = [
  {
    src: '/images/about/desktop-logo-google.png',
    alt: 'Google for Startups',
    width: 2122,
    height: 741,
    frame: 'wide',
  },
  {
    src: '/images/about/desktop-logo-microsoft.png',
    alt: 'Microsoft for Startups',
    width: 2121,
    height: 741,
    frame: 'wide',
  },
  {
    src: '/images/about/desktop-logo-wistron.png',
    alt: 'Wistron',
    width: 1774,
    height: 887,
    frame: 'wide',
  },
]

function DesktopLogos({ items }: { items: DesktopLogo[] }) {
  return (
    <ul className="partners__logos">
      {items.map((item) => (
        <li className="partners__tile" key={item.alt}>
          <span className={`partners__logo-frame partners__logo-frame--${item.frame}`}>
            <img alt={item.alt} height={item.height} src={item.src} width={item.width} />
          </span>
        </li>
      ))}
    </ul>
  )
}

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
    <section aria-label="Building with trusted partners" className="partners">
      <div className="partners__copy">
        <div className="partners__intro">
          <p className={`partners__eyebrow ${bodyClassName}`}>Meet Our Partners</p>
          <h2 className="partners__title">
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
      <div className="partners__desktop">
        <div className="partners__heading">
          <p className={`partners__pill ${bodyClassName}`}>Meet Our Partners</p>
          <h2 className="partners__desktop-title">Building with trusted partners</h2>
          <p className={`partners__lead ${bodyClassName}`}>
            We are supported by investors and strategic partners who share our belief in a more
            capable and accessible future for robotic operations.
          </p>
        </div>
        <div className="partners__rows">
          <div className="partners__row">
            <h3 className={`partners__row-title ${bodyClassName}`}>Investors</h3>
            <DesktopLogos items={desktopInvestors} />
          </div>
          <div className="partners__row partners__row--strategic">
            <h3 className={`partners__row-title ${bodyClassName}`}>Strategic Partners</h3>
            <DesktopLogos items={desktopPartners} />
          </div>
        </div>
      </div>
    </section>
  )
}
