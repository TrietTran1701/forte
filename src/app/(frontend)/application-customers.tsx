'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const SLIDE_SECONDS = 0.6
const DRAG_THRESHOLD = 48

type CustomerSlide = {
  src: string
  desktopSrc: string
  desktopWidth: number
  desktopHeight: number
  alt: string
  title: string
  description: string
}

const customerSlides: CustomerSlide[] = [
  {
    src: '/images/application/Mobile_Patrol%201.png',
    desktopSrc: '/images/application/desktop-industrial.png',
    desktopWidth: 2040,
    desktopHeight: 1555,
    alt: 'Drones flying over an industrial park',
    title: 'Industrial Zones',
    description:
      'Give security teams aerial visibility across factories, industrial parks, and surrounding areas.',
  },
  {
    src: '/images/application/Mobile_Patrol%202.png',
    desktopSrc: '/images/application/desktop-agricultural.png',
    desktopWidth: 2040,
    desktopHeight: 1555,
    alt: 'Drones flying over farmland and agricultural buildings',
    title: 'Agricultural Sites',
    description:
      'Support patrols across farmland and agricultural facilities with coordinated aerial observation.',
  },
  {
    src: '/images/application/Mobile_Patrol%203.png',
    desktopSrc: '/images/application/desktop-estate.png',
    desktopWidth: 2040,
    desktopHeight: 1555,
    alt: 'Drones flying over a private estate',
    title: 'Private Properties & Estates',
    description: 'Extend security coverage across large properties with mobile aerial support.',
  },
]

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <span aria-hidden="true" className={`customers-carousel__chevron customers-carousel__chevron--${direction}`} />
  )
}

export function ApplicationCustomers({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = customerSlides.length - 1

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current
      const track = root?.querySelector<HTMLElement>('.ideal-carousel__track')
      if (!root || !track || !contextSafe) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const indexRef = { current: 0 }
      let slideTween: gsap.core.Tween | null = null
      let drag: { pointerId: number; x: number; origin: number } | null = null

      const step = () => {
        const card = track.querySelector<HTMLElement>('.ideal-carousel__card')
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 51
        return (card?.offsetWidth || 0) + gap
      }

      const playback = {
        goTo: (_next: number) => {},
      }

      playback.goTo = contextSafe((next: number) => {
        const index = Math.max(0, Math.min(lastIndex, next))
        indexRef.current = index
        setActiveIndex(index)
        slideTween?.kill()
        slideTween = gsap.to(track, {
          x: -index * step(),
          duration: reducedMotion ? 0 : SLIDE_SECONDS,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      })

      goToRef.current = playback.goTo

      const viewport = root.querySelector<HTMLElement>('.ideal-carousel__viewport')
      if (!viewport) return

      const snapBack = contextSafe(() => {
        slideTween?.kill()
        slideTween = gsap.to(track, {
          x: -indexRef.current * step(),
          duration: reducedMotion ? 0 : 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return
        drag = {
          pointerId: event.pointerId,
          x: event.clientX,
          origin: Number(gsap.getProperty(track, 'x')) || 0,
        }
        viewport.setPointerCapture(event.pointerId)
      }

      const onPointerMove = contextSafe((event: PointerEvent) => {
        if (!drag || drag.pointerId !== event.pointerId) return
        gsap.set(track, { x: drag.origin + (event.clientX - drag.x) })
      })

      const onPointerUp = contextSafe((event: PointerEvent) => {
        if (!drag || drag.pointerId !== event.pointerId) return
        const delta = event.clientX - drag.x
        drag = null

        if (Math.abs(delta) >= DRAG_THRESHOLD) {
          const next = indexRef.current + (delta < 0 ? 1 : -1)
          if (next < 0 || next > lastIndex) {
            snapBack()
            return
          }
          playback.goTo(next)
          return
        }

        snapBack()
      })

      const onResize = contextSafe(() => {
        gsap.set(track, { x: -indexRef.current * step() })
      })

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          playback.goTo(indexRef.current + 1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          playback.goTo(indexRef.current - 1)
        }
      }

      viewport.addEventListener('pointerdown', onPointerDown)
      viewport.addEventListener('pointermove', onPointerMove)
      viewport.addEventListener('pointerup', onPointerUp)
      viewport.addEventListener('pointercancel', onPointerUp)
      root.addEventListener('keydown', onKeyDown)
      window.addEventListener('resize', onResize)

      return () => {
        viewport.removeEventListener('pointerdown', onPointerDown)
        viewport.removeEventListener('pointermove', onPointerMove)
        viewport.removeEventListener('pointerup', onPointerUp)
        viewport.removeEventListener('pointercancel', onPointerUp)
        root.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: rootRef },
  )

  return (
    <section aria-label="Extend your team’s reach across large sites" className="ideal">
      <div className="ideal__copy">
        <div className="ideal__intro">
          <p className={`ideal__eyebrow ${bodyClassName}`}>{`Automated Security & Patrols`}</p>
          <h2 className="ideal__title">
            Extend your team’s reach across large sites
          </h2>
        </div>
        <p className={`ideal__body ${bodyClassName}`}>
          Support security teams with drone fleets that work together on patrol missions. Collect
          aerial information to help teams understand conditions on site.
        </p>
      </div>
      <div
        aria-label="Ideal customers"
        aria-roledescription="carousel"
        className={`ideal-carousel ${bodyClassName}`}
        ref={rootRef}
      >
        <div className="ideal-carousel__viewport">
          <div className="ideal-carousel__track">
            {customerSlides.map((slide, index) => (
              <article
                aria-hidden={index !== activeIndex}
                className="ideal-carousel__card"
                key={slide.title}
              >
                <div className="ideal-carousel__media">
                  <img
                    alt={index === activeIndex ? slide.alt : ''}
                    className="ideal-carousel__image"
                    draggable={false}
                    height={235}
                    src={slide.src}
                    width={327}
                  />
                </div>
                <div className="ideal-carousel__copy">
                  <h3 className="ideal-carousel__title">{slide.title}</h3>
                  <p className="ideal-carousel__body">{slide.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="customers-carousel__controls">
          <button
            aria-label="Previous customer"
            className="customers-carousel__nav"
            disabled={activeIndex === 0}
            type="button"
            onClick={() => goToRef.current(activeIndex - 1)}
          >
            <Chevron direction="left" />
          </button>
          <button
            aria-label="Next customer"
            className="customers-carousel__nav"
            disabled={activeIndex === lastIndex}
            type="button"
            onClick={() => goToRef.current(activeIndex + 1)}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
      <div className="ideal__desktop">
        <div className="ideal__heading">
          <p className={`ideal__pill ${bodyClassName}`}>{`Automated Security & Patrols`}</p>
          <h2 className="ideal__desktop-title">Extend your team’s reach across large sites</h2>
          <p className={`ideal__lead ${bodyClassName}`}>
            Support security teams with drone fleets that work together on patrol missions. Collect
            aerial information to help teams understand conditions on site.
          </p>
        </div>
        <div className="ideal__grid">
          {customerSlides.map((slide) => (
            <article className="ideal__card" key={slide.title}>
              <div className="ideal__shot">
                <img
                  alt={slide.alt}
                  className="ideal__photo"
                  height={slide.desktopHeight}
                  src={slide.desktopSrc}
                  width={slide.desktopWidth}
                />
              </div>
              <div className={`ideal__card-copy ${bodyClassName}`}>
                <h3 className="ideal__card-title">{slide.title}</h3>
                <p className="ideal__card-body">{slide.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
