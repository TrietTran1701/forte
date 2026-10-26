import React from 'react'

const useCases = [
  {
    src: '/images/application/Icon/Coastlines%20Icon.png',
    alt: '',
    title: 'Coastlines',
    description: 'Support coastal rescue coordination with aerial views.',
  },
  {
    src: '/images/application/Icon/Highways%20Icon.png',
    alt: '',
    title: 'Highways',
    description:
      'Provide aerial context to help teams assess incidents and coordinate response.',
  },
  {
    src: '/images/application/Icon/Remote%20Areas%20Icon.png',
    alt: '',
    title: 'Remote Areas',
    description: 'Support situational assessment where access on the ground is difficult.',
  },
]

export function ApplicationResponse({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="emergency-response-heading" className="response">
      <img
        alt=""
        className="response__image"
        height={912}
        src="/images/application/Mobile_Respond.png"
        width={375}
      />
      <div className="response__overlay" />
      <div className="response__copy">
        <div className="response__intro">
          <p className={`response__eyebrow ${bodyClassName}`}>Emergency Response</p>
          <h2 className="response__title" id="emergency-response-heading">
            Extend your team’s reach across large sites
          </h2>
        </div>
        <p className={`response__body ${bodyClassName}`}>
          Support security teams with drone fleets that work together on patrol missions. Collect
          aerial information across agricultural, industrial, and private properties to help teams
          understand conditions on site.
        </p>
        <ul className="response__list">
          {useCases.map((item) => (
            <li className="response__item" key={item.title}>
              <img alt={item.alt} className="response__icon" height={36} src={item.src} width={36} />
              <h3 className={`response__label ${bodyClassName}`}>{item.title}</h3>
              <p className={`response__detail ${bodyClassName}`}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
