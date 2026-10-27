import React from 'react'

const useCases = [
  {
    src: '/images/application/Icon/Coastlines%20Icon.png',
    desktopSrc: '/images/application/desktop-icon-coast.png',
    desktopWidth: 1536,
    desktopHeight: 1024,
    alt: '',
    title: 'Coastlines',
    description: 'Support coastal rescue coordination with aerial views.',
  },
  {
    src: '/images/application/Icon/Highways%20Icon.png',
    desktopSrc: '/images/application/desktop-icon-highway.png',
    desktopWidth: 1536,
    desktopHeight: 1024,
    alt: '',
    title: 'Highways',
    description: 'Provide aerial context to help teams assess incidents and coordinate response.',
  },
  {
    src: '/images/application/Icon/Remote%20Areas%20Icon.png',
    desktopSrc: '/images/application/desktop-icon-remote.png',
    desktopWidth: 1536,
    desktopHeight: 1024,
    alt: '',
    title: 'Remote Areas',
    description: 'Support situational assessment where access on the ground is difficult.',
  },
]

export function ApplicationResponse({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-label="Coordinate aerial support when time matters" className="response">
      <img
        alt=""
        className="response__photo"
        height={941}
        src="/images/application/desktop-response.png"
        width={1672}
      />
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
          <h2 className="response__title">
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
      <div className="response__desktop">
        <div className={`response__panel ${bodyClassName}`}>
          <div className="response__heading">
            <p className="response__pill">Emergency Response</p>
            <h2 className="response__desktop-title">Coordinate aerial support when time matters</h2>
            <p className="response__desktop-body">
              Deploy synchronized drones to support rescue coordination and provide real-time aerial
              information.
            </p>
            <div className="response__rule" />
          </div>
          <ul className="response__benefits">
            {useCases.map((item) => (
              <li className="response__benefit" key={item.title}>
                <img
                  alt=""
                  className="response__benefit-icon"
                  height={item.desktopHeight}
                  src={item.desktopSrc}
                  width={item.desktopWidth}
                />
                <h3 className="response__benefit-title">{item.title}</h3>
                <p className="response__benefit-body">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
