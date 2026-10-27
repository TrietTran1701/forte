import React from 'react'

import { SoftwareCarousel } from './software-carousel'

const softwareFeatures: Array<{
  src: string
  alt: string
  width: number
  height: number
  title: string
  description: string
  contain?: boolean
  flip?: boolean
}> = [
  {
    src: '/images/product/software-desktop-1.png',
    alt: 'Forte fleet control dashboard coordinating drones across a site',
    width: 1672,
    height: 941,
    title: 'Collaborative Fleet Control',
    description: 'Coordinate drones to work together on shared tasks across a mission.',
    contain: true,
  },
  {
    src: '/images/product/software-desktop-2.png',
    alt: 'Forte visual analysis of aerial imagery',
    width: 1672,
    height: 941,
    title: 'AI-Assisted Visual Analysis',
    description:
      'Use AI and computer vision to support the processing and interpretation of aerial imagery.',
    flip: true,
  },
  {
    src: '/images/product/software-desktop-3.png',
    alt: 'Forte autonomy software extending lower-cost drones',
    width: 1670,
    height: 941,
    title: 'Autonomy for Accessible Robotics',
    description:
      'Expand what lower-cost drones can achieve through intelligent software and coordinated operation.',
  },
]

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
      <div className="software__desktop">
        <div className="software__heading">
          <p className={`software__pill ${bodyClassName}`}>Intelligent Mission Control</p>
          <h2 className="software__title">Bring your drones together around one mission</h2>
          <p className={`software__lead ${bodyClassName}`}>
            Coordinate multiple drones through software built for collaborative autonomy. Integrated
            AI and computer vision support visual data analysis.
          </p>
        </div>
        <div className="software__rows">
          {softwareFeatures.map((feature) => (
            <article
              className={`software__row${feature.flip ? ' software__row--flip' : ''}`}
              key={feature.src}
            >
              <div className="software__shot">
                <img
                  alt={feature.alt}
                  className={
                    feature.contain ? 'software__image software__image--contain' : 'software__image'
                  }
                  height={feature.height}
                  src={feature.src}
                  width={feature.width}
                />
              </div>
              <div className={`software__aside ${bodyClassName}`}>
                <h3 className="software__name">{feature.title}</h3>
                <p className="software__detail">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
