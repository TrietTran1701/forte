'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

import { EASE_IN_OUT } from './eases'

gsap.registerPlugin(useGSAP)

const SLIDE_SECONDS = 0.5
const DRAG_THRESHOLD = 48
const CAPTION_FRAME = 375
const CAPTION_ACTIVE = { width: 293, height: 120 }
// The design's inactive y-offset of 21 is `120 - 99`, i.e. a bottom-aligned card, so the
// panel's `align-items: flex-end` supplies it instead of a tweened margin.
const CAPTION_INACTIVE = { width: 242, height: 99 }
const CAPTION_GAP = 12
const CAPTION_INSET = 41
/**
 * The inactive card is a uniform shrink of the active one (242/293 and 99/120 agree to
 * within 0.1%), so the state change is a transform. Tweening width/height instead would
 * re-wrap the text mid-animation.
 */
const CAPTION_SCALE = CAPTION_INACTIVE.width / CAPTION_ACTIVE.width

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

    const captionViewport = root.querySelector<HTMLElement>('.product-carousel__captions')
    const captionTrack = root.querySelector<HTMLElement>('.product-carousel__caption-track')
    const captions = captionTrack
      ? gsap.utils.toArray<HTMLElement>('.product-carousel__caption', captionTrack)
      : []

    const captionMetrics = () => {
      const width = captionViewport?.offsetWidth || 0
      if (width <= 0) return null

      const scale = width / CAPTION_FRAME
      return {
        activeW: CAPTION_ACTIVE.width * scale,
        activeH: CAPTION_ACTIVE.height * scale,
        gap: CAPTION_GAP * scale,
        inset: CAPTION_INSET * scale,
      }
    }

    /**
     * Every caption is laid out at its active size and left there, so the text wraps once
     * and never again. Returns the frame height: the wordiest slide's content height.
     */
    const layoutCaptions = (metrics: NonNullable<ReturnType<typeof captionMetrics>>) => {
      let tallest = 0
      captions.forEach((caption) => {
        caption.style.width = `${metrics.activeW}px`
        caption.style.height = 'auto'
        tallest = Math.max(tallest, caption.offsetHeight)
      })
      return tallest || metrics.activeH
    }

    const placeCaptions = (index: number, duration: number) => {
      const metrics = captionMetrics()
      if (!metrics || !captionTrack || !captionViewport) return

      captionTrack.style.gap = `${metrics.gap}px`
      captionTrack.style.paddingLeft = `${metrics.inset}px`

      // The frame hugs the wordiest slide so the baseline under the photo, the nav
      // buttons and the section height never shift between slides.
      captionViewport.style.height = `${layoutCaptions(metrics)}px`

      gsap.to(captions, {
        scale: (i: number) => (i === index ? 1 : CAPTION_SCALE),
        opacity: (i: number) => (i === index ? 1 : 0),
        duration,
        ease: EASE_IN_OUT,
        overwrite: 'auto',
      })
      gsap.to(captionTrack, {
        x: -index * (metrics.activeW + metrics.gap),
        duration,
        ease: EASE_IN_OUT,
        overwrite: 'auto',
      })
    }

    const captionXForPhoto = (photoX: number) => {
      const metrics = captionMetrics()
      const photoStep = step()
      if (!metrics || !photoStep) return 0
      return photoX * ((metrics.activeW + metrics.gap) / photoStep)
    }

    const playback = {
      goTo: (_next: number) => {},
    }

    playback.goTo = contextSafe((next: number) => {
      const index = Math.max(0, Math.min(lastIndex, next))
      indexRef.current = index
      setActiveIndex(index)
      const duration = reducedMotion ? 0 : SLIDE_SECONDS
      slideTween?.kill()
      slideTween = gsap.to(track, {
        x: -index * step(),
        duration,
        ease: EASE_IN_OUT,
        overwrite: 'auto',
      })
      placeCaptions(index, duration)
    })

    goToRef.current = playback.goTo
    // Scale from the baseline the card shares with the nav buttons, so it grows upward.
    gsap.set(captions, { transformOrigin: 'center bottom' })
    placeCaptions(0, 0)

    const viewport = root.querySelector<HTMLElement>('.product-carousel__viewport')
    if (!viewport) return

    const snapBack = contextSafe(() => {
      const duration = reducedMotion ? 0 : 0.45
      slideTween?.kill()
      slideTween = gsap.to(track, {
        x: -indexRef.current * step(),
        duration,
        ease: EASE_IN_OUT,
        overwrite: 'auto',
      })
      placeCaptions(indexRef.current, duration)
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
      const photoX = drag.origin + (event.clientX - drag.x)
      gsap.set(track, { x: photoX })
      if (captionTrack) gsap.set(captionTrack, { x: captionXForPhoto(photoX) })
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
      placeCaptions(indexRef.current, 0)
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
          <div className="product-carousel__caption-track">
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
