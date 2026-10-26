import React from 'react'

import { SoftwareCarousel } from './software-carousel'

export function SoftwareSection({ bodyClassName }: { bodyClassName: string }) {
  return (
    <section aria-labelledby="software-heading" className="product software">
      <div className="product__copy">
        <div className="product__intro">
          <p className={`product__eyebrow ${bodyClassName}`}>Intelligent Mission Control</p>
          <h2 className="product__title" id="software-heading">
            Bring your drones together around one mission.
          </h2>
        </div>
        <p className={`product__body ${bodyClassName}`}>
          Coordinate multiple drones through software built for collaborative autonomy. Integrated
          AI and computer vision support visual data analysis.
        </p>
      </div>
      <SoftwareCarousel bodyClassName={bodyClassName} />
    </section>
  )
}
