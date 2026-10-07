'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const PROGRESS_SECONDS = 5
const SLIDE_SECONDS = 0.6
const DRAG_THRESHOLD = 48
const INDICATOR_FILL_WIDTH = 82

type FeatureSlide = {
  src: string
  alt: string
  title: string
  description: string
}

const featureSlides: FeatureSlide[] = [
  {
    src: '/images/Product%201.png',
    alt: 'Forte dashboard showing the connected drone fleet',
    title: 'Rapid Deployment',
    description: 'Deliver highly effective, easy-to-deploy drone security solutions',
  },
  {
    src: '/images/Product%202.png',
    alt: 'Forte operations console during a perimeter breach',
    title: 'Monitor Continuously',
    description: 'Enable continuous surveillance with minimal human error or delay',
  },
  {
    src: '/images/Product%203.png',
    alt: 'Forte monitor with live patrol routes and fleet status',
    title: 'Lower Operating Costs',
    description: 'Reduce operational costs while improving safety and visibility',
  },
]

const renderedSlides = [...featureSlides, featureSlides[0]]

export function CardCarousel({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP((_context, contextSafe) => {
    const root = rootRef.current
    const track = root?.querySelector<HTMLElement>('.card-carousel__track')
    if (!root || !track || !contextSafe) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover)').matches
    const indexRef = { current: 0 }
    const holds = { hover: false, focus: false, drag: false }
    let progressTween: gsap.core.Tween | null = null
    let slideTween: gsap.core.Tween | null = null
    let drag: { pointerId: number; x: number; origin: number } | null = null

    const step = () => {
      const card = track.querySelector<HTMLElement>('.card-carousel__card')
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16
      return (card?.offsetWidth || 312) + gap
    }

    const fills = () =>
      Array.from(root.querySelectorAll<HTMLElement>('.card-carousel__indicator-fill'))

    const syncPause = () => {
      if (!progressTween) return
      if (holds.hover || holds.focus || holds.drag) progressTween.pause()
      else progressTween.resume()
    }

    const resetFills = () => {
      fills().forEach((fill) => {
        gsap.killTweensOf(fill)
        gsap.set(fill, { width: 0 })
      })
    }

    const playback = {
      goTo: (_next: number) => {},
      startProgress: (_index: number) => {},
    }

    playback.startProgress = contextSafe((index: number) => {
      progressTween?.kill()
      progressTween = null
      if (reducedMotion) return

      const fill = fills()[index]
      if (!fill) return

      progressTween = gsap.to(fill, {
        width: INDICATOR_FILL_WIDTH,
        duration: PROGRESS_SECONDS,
        ease: 'none',
        onComplete: () => playback.goTo(index + 1),
      })
      syncPause()
    })

    playback.goTo = contextSafe((next: number) => {
      const count = featureSlides.length
      progressTween?.kill()
      progressTween = null
      slideTween?.kill()
      resetFills()

      const settle = (index: number, animateTo: number, jumpTo?: number) => {
        indexRef.current = index
        setActiveIndex(index)
        slideTween = gsap.to(track, {
          x: -animateTo * step(),
          duration: reducedMotion ? 0 : SLIDE_SECONDS,
          ease: 'power2.inOut',
          overwrite: 'auto',
          onComplete: () => {
            if (jumpTo != null) gsap.set(track, { x: -jumpTo * step() })
            playback.startProgress(index)
          },
        })
      }

      if (next >= count) {
        settle(0, count, 0)
        return
      }

      if (next < 0) {
        gsap.set(track, { x: -count * step() })
        settle(count - 1, count - 1)
        return
      }

      settle(next, next)
    })

    goToRef.current = playback.goTo

    const viewport = root.querySelector<HTMLElement>('.card-carousel__viewport')
    if (!viewport) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      holds.drag = true
      syncPause()
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
      holds.drag = false

      if (Math.abs(delta) >= DRAG_THRESHOLD) {
        playback.goTo(indexRef.current + (delta < 0 ? 1 : -1))
        return
      }

      slideTween?.kill()
      slideTween = gsap.to(track, {
        x: -indexRef.current * step(),
        duration: reducedMotion ? 0 : 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      syncPause()
    })

    const onMouseEnter = () => {
      holds.hover = true
      syncPause()
    }

    const onMouseLeave = () => {
      holds.hover = false
      syncPause()
    }

    const onFocusIn = () => {
      holds.focus = true
      syncPause()
    }

    const onFocusOut = (event: FocusEvent) => {
      if (root.contains(event.relatedTarget as Node | null)) return
      holds.focus = false
      syncPause()
    }

    const onVisibility = () => {
      if (document.hidden) progressTween?.pause()
      else syncPause()
    }

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
    root.addEventListener('focusin', onFocusIn)
    root.addEventListener('focusout', onFocusOut)
    root.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)
    if (canHover) {
      root.addEventListener('mouseenter', onMouseEnter)
      root.addEventListener('mouseleave', onMouseLeave)
    }

    playback.startProgress(0)

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerUp)
      root.removeEventListener('focusin', onFocusIn)
      root.removeEventListener('focusout', onFocusOut)
      root.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      root.removeEventListener('mouseenter', onMouseEnter)
      root.removeEventListener('mouseleave', onMouseLeave)
    }
  }, { scope: rootRef })

  return (
    <section
      aria-label="Product features"
      aria-roledescription="carousel"
      className={`card-carousel ${bodyClassName}`}
      ref={rootRef}
    >
      <div className="card-carousel__viewport">
        <div className="card-carousel__track">
          {renderedSlides.map((slide, index) => {
            const isClone = index === featureSlides.length
            const isActive = index === activeIndex

            return (
              <article
                aria-hidden={!isActive || isClone}
                className="card-carousel__card"
                key={`${slide.title}-${index}`}
              >
                <img
                  alt={isClone ? '' : slide.alt}
                  className="card-carousel__image"
                  draggable={false}
                  height={432}
                  src={slide.src}
                  width={312}
                />
                <div className="card-carousel__caption">
                  <div aria-hidden="true" className="card-carousel__caption-fill" />
                  <div aria-hidden="true" className="card-carousel__caption-gradient" />
                  <div className="card-carousel__copy">
                    {isClone ? (
                      <p className="card-carousel__title">{slide.title}</p>
                    ) : (
                      <h3 className="card-carousel__title">{slide.title}</h3>
                    )}
                    <p className="card-carousel__description">{slide.description}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div aria-label="Choose a feature" className="card-carousel__indicators" role="group">
        {featureSlides.map((slide, index) => (
          <button
            aria-current={index === activeIndex ? 'true' : undefined}
            aria-label={slide.title}
            className="card-carousel__indicator"
            key={slide.title}
            type="button"
            onClick={() => goToRef.current(index)}
          >
            <span aria-hidden="true" className="card-carousel__indicator-fill" />
          </button>
        ))}
      </div>
    </section>
  )
}
