'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const SLIDE_SECONDS = 0.6
const DRAG_THRESHOLD = 48

type CustomerSlide = {
  src: string
  alt: string
  title: string
  description: string
  detail?: string
}

const customerSlides: CustomerSlide[] = [
  {
    src: '/images/Customer%201.png',
    alt: 'Drone and cameras watching a gated residential street',
    title: 'Residential.',
    description: 'Smarter community protection. 24/7 automated patrols for safer communities.',
  },
  {
    src: '/images/Customer%202.png',
    alt: 'Drone and cameras monitoring a warehouse loading yard',
    title: 'Industrial.',
    description: 'Secure large-scale sites',
    detail: 'Monitor assets, perimeters, and critical areas.',
  },
  {
    src: '/images/Customer%203.png',
    alt: 'Drone and cameras over a civic plaza and public building',
    title: 'Public & Institutional.',
    description: 'Security without disruption. Continuous monitoring for sensitive environments.',
  },
  {
    src: '/images/Customer%204.png',
    alt: 'Security operators watching drone feeds in a control room',
    title: 'Security Companies.',
    description: 'Scale your security services. Add smart drone protection to your operations.',
  },
]

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <span aria-hidden="true" className={`customers-carousel__chevron customers-carousel__chevron--${direction}`} />
  )
}

export function CustomersCarousel({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = customerSlides.length - 1

  useGSAP((_context, contextSafe) => {
    const root = rootRef.current
    const track = root?.querySelector<HTMLElement>('.customers-carousel__track')
    if (!root || !track || !contextSafe) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const indexRef = { current: 0 }
    let slideTween: gsap.core.Tween | null = null
    let drag: { pointerId: number; x: number; origin: number } | null = null

    const step = () => {
      const card = track.querySelector<HTMLElement>('.customers-carousel__card')
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 24
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

    const viewport = root.querySelector<HTMLElement>('.customers-carousel__viewport')
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
  }, { scope: rootRef })

  return (
    <div
      aria-label="Ideal customers"
      aria-roledescription="carousel"
      className={`customers-carousel ${bodyClassName}`}
      ref={rootRef}
    >
      <div className="customers-carousel__viewport">
        <div className="customers-carousel__track">
          {customerSlides.map((slide, index) => (
            <article
              aria-current={index === activeIndex ? 'true' : undefined}
              className="customers-carousel__card"
              key={slide.title}
            >
              <div className="customers-carousel__media">
                <img
                  alt={slide.alt}
                  className="customers-carousel__image"
                  draggable={false}
                  height={328}
                  src={slide.src}
                  width={246}
                />
              </div>
              <p className="customers-carousel__caption">
                <span className="customers-carousel__label">{slide.title}</span> {slide.description}
                {slide.detail ? (
                  <>
                    <br />
                    {slide.detail}
                  </>
                ) : null}
              </p>
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
  )
}
