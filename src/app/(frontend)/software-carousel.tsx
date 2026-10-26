'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const SLIDE_SECONDS = 0.6
const DRAG_THRESHOLD = 48

type SoftwareSlide = {
  src: string
  alt: string
  title: string
  description: string
}

const softwareSlides: SoftwareSlide[] = [
  {
    src: '/images/product/software-1.png',
    alt: 'Forte fleet control dashboard coordinating drones across a site',
    title: 'Collaborative Fleet Control',
    description: 'Coordinate drones to work together on shared tasks across a mission.',
  },
  {
    src: '/images/product/software-2.png',
    alt: 'Forte visual analysis of aerial imagery',
    title: 'AI-Assisted Visual Analysis',
    description:
      'Use AI and computer vision to support the processing and interpretation of aerial imagery.',
  },
  {
    src: '/images/product/software-3.png',
    alt: 'Forte autonomy software extending lower-cost drones',
    title: 'Autonomy for Accessible Robotics',
    description:
      'Expand what lower-cost drones can achieve through intelligent software and coordinated operation.',
  },
]

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <span aria-hidden="true" className={`customers-carousel__chevron customers-carousel__chevron--${direction}`} />
  )
}

export function SoftwareCarousel({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = softwareSlides.length - 1

  useGSAP((_context, contextSafe) => {
    const root = rootRef.current
    const track = root?.querySelector<HTMLElement>('.software-carousel__track')
    if (!root || !track || !contextSafe) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const indexRef = { current: 0 }
    let slideTween: gsap.core.Tween | null = null
    let drag: { pointerId: number; x: number; origin: number } | null = null

    const step = () => {
      const card = track.querySelector<HTMLElement>('.software-carousel__card')
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

    const viewport = root.querySelector<HTMLElement>('.software-carousel__viewport')
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
      aria-label="Software"
      aria-roledescription="carousel"
      className={`software-carousel ${bodyClassName}`}
      ref={rootRef}
    >
      <div className="software-carousel__viewport">
        <div className="software-carousel__track">
          {softwareSlides.map((slide, index) => (
            <article
              aria-hidden={index !== activeIndex}
              className="software-carousel__card"
              key={slide.title}
            >
              <div className="software-carousel__media">
                <img
                  alt={index === activeIndex ? slide.alt : ''}
                  className="software-carousel__image"
                  draggable={false}
                  height={235}
                  src={slide.src}
                  width={327}
                />
              </div>
              <div className="software-carousel__copy">
                <h3 className="software-carousel__title">{slide.title}</h3>
                <p className="software-carousel__body">{slide.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="customers-carousel__controls">
        <button
          aria-label="Previous software"
          className="customers-carousel__nav"
          disabled={activeIndex === 0}
          type="button"
          onClick={() => goToRef.current(activeIndex - 1)}
        >
          <Chevron direction="left" />
        </button>
        <button
          aria-label="Next software"
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
