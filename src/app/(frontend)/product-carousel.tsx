'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

import { EASE_IN_OUT } from './eases'

gsap.registerPlugin(useGSAP)

const SLIDE_SECONDS = 0.5
const DRAG_THRESHOLD = 48

type ProductSlide = {
  src: string
  alt: string
  title: string
  description: string
}

const productSlides: ProductSlide[] = [
  {
    src: '/images/Product%201.png',
    alt: 'Forte dashboard coordinating a connected drone fleet',
    title: 'Coordinate.',
    description:
      'Manage multiple drones simultaneously for the same mission from one centralized control platform.',
  },
  {
    src: '/images/Product%203.png',
    alt: 'Forte monitor with live patrol routes and fleet status',
    title: 'Monitor.',
    description:
      'Assign patrol zones, routes, and coverage tasks across large or hard to cover environments with better continuity.',
  },
  {
    src: '/images/Product%202.png',
    alt: 'Forte incident console detecting a perimeter breach',
    title: 'Respond.',
    description:
      'Use AI to detect, support situation analysis, and help teams act faster through realtime alerts and live operational visibility.',
  },
]

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return <span aria-hidden="true" className={`product-carousel__chevron product-carousel__chevron--${direction}`} />
}

export function ProductCarousel({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = productSlides.length - 1

  useGSAP((_context, contextSafe) => {
    const root = rootRef.current
    const track = root?.querySelector<HTMLElement>('.product-carousel__track')
    if (!root || !track || !contextSafe) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const indexRef = { current: 0 }
    let slideTween: gsap.core.Tween | null = null
    let drag: { pointerId: number; x: number; origin: number } | null = null

    const step = () => {
      const card = track.querySelector<HTMLElement>('.product-carousel__card')
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
        ease: EASE_IN_OUT,
        overwrite: 'auto',
      })
    })

    goToRef.current = playback.goTo

    const viewport = root.querySelector<HTMLElement>('.product-carousel__viewport')
    if (!viewport) return

    const snapBack = contextSafe(() => {
      slideTween?.kill()
      slideTween = gsap.to(track, {
        x: -indexRef.current * step(),
        duration: reducedMotion ? 0 : 0.45,
        ease: EASE_IN_OUT,
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
      aria-label="Products"
      aria-roledescription="carousel"
      className={`product-carousel ${bodyClassName}`}
      ref={rootRef}
    >
      <div className="product-carousel__viewport">
        <div className="product-carousel__track">
          {productSlides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <article
                aria-hidden={!isActive}
                className="product-carousel__card"
                key={slide.title}
              >
                <img
                  alt={isActive ? slide.alt : ''}
                  className="product-carousel__image"
                  draggable={false}
                  height={216}
                  src={slide.src}
                  width={327}
                />
              </article>
            )
          })}
        </div>
      </div>
      <div className="product-carousel__panel">
        <button
          aria-label="Previous product"
          className="product-carousel__nav product-carousel__nav--prev"
          disabled={activeIndex === 0}
          type="button"
          onClick={() => goToRef.current(activeIndex - 1)}
        >
          <Chevron direction="left" />
        </button>
        <div aria-live="polite" className="product-carousel__captions">
          {productSlides.map((slide, index) => (
            <p
              aria-hidden={index !== activeIndex}
              className={`product-carousel__caption${index === activeIndex ? ' product-carousel__caption--active' : ''}`}
              key={slide.title}
            >
              <span className="product-carousel__label">{slide.title}</span> {slide.description}
            </p>
          ))}
        </div>
        <button
          aria-label="Next product"
          className="product-carousel__nav product-carousel__nav--next"
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
