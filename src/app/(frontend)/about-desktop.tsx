'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

import { EASE_INDICATOR } from './eases'

gsap.registerPlugin(useGSAP)

const PROGRESS_SECONDS = 2
const INDICATOR_FILL_START = 1
const INDICATOR_FILL_WIDTH = 80

type AboutSlide = {
  headingSrc: string
  extendedSrc: string
  headingWidth: number
  headingHeight: number
  extendedWidth: number
  extendedHeight: number
  alt: string
  title: string
  description: string
}

const aboutSlides: AboutSlide[] = [
  {
    headingSrc: '/images/home/key-1-heading.png',
    extendedSrc: '/images/home/key-1-extended.png',
    headingWidth: 1066,
    headingHeight: 1476,
    extendedWidth: 1448,
    extendedHeight: 1086,
    alt: 'Drone fleet over a warehouse with live feed, patrol route, and fleet status',
    title: 'Rapid Deployment',
    description: 'Deliver highly effective, easy-to-deploy drone security solutions',
  },
  {
    headingSrc: '/images/home/key-2-heading.png',
    extendedSrc: '/images/home/key-2-extended.png',
    headingWidth: 1066,
    headingHeight: 1476,
    extendedWidth: 1448,
    extendedHeight: 1086,
    alt: 'Drone launching from a dock with site-ready checks and an auto-patrol route',
    title: 'Monitor Continuously',
    description: 'Enable continuous surveillance with minimal human error or delay',
  },
  {
    headingSrc: '/images/home/key-3-heading.png',
    extendedSrc: '/images/home/key-3-extended.png',
    headingWidth: 1066,
    headingHeight: 1476,
    extendedWidth: 1448,
    extendedHeight: 1086,
    alt: 'Operator reviewing live drone feeds, alert trends, and operational efficiency',
    title: 'Lower Operating Costs',
    description: 'Reduce operational costs while improving safety and visibility',
  },
]

export function AboutDesktop({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current
      if (!root || !contextSafe) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const canHover = window.matchMedia('(hover: hover)').matches
      const indexRef = { current: 0 }
      const holds = { hover: false, focus: false }
      let progressTween: gsap.core.Tween | null = null

      const fills = () =>
        Array.from(root.querySelectorAll<HTMLElement>('.about-cards__indicator-fill'))

      const syncPause = () => {
        if (!progressTween) return
        if (holds.hover || holds.focus) progressTween.pause()
        else progressTween.resume()
      }

      const resetFills = () => {
        fills().forEach((fill) => {
          gsap.killTweensOf(fill)
          gsap.set(fill, { width: INDICATOR_FILL_START })
        })
      }

      const playback = {
        goTo: (_next: number) => {},
        startProgress: (_index: number) => {},
      }

      playback.startProgress = contextSafe((index: number) => {
        progressTween?.kill()
        progressTween = null

        const fill = fills()[index]
        if (!fill) return

        if (reducedMotion) {
          gsap.set(fill, { width: INDICATOR_FILL_WIDTH })
          return
        }

        progressTween = gsap.to(fill, {
          width: INDICATOR_FILL_WIDTH,
          duration: PROGRESS_SECONDS,
          ease: EASE_INDICATOR,
          onComplete: () => playback.goTo(index + 1),
        })
        syncPause()
      })

      playback.goTo = contextSafe((next: number) => {
        const count = aboutSlides.length
        const index = ((next % count) + count) % count
        progressTween?.kill()
        progressTween = null
        resetFills()
        indexRef.current = index
        setActiveIndex(index)
        playback.startProgress(index)
      })

      goToRef.current = playback.goTo

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

      root.addEventListener('focusin', onFocusIn)
      root.addEventListener('focusout', onFocusOut)
      root.addEventListener('keydown', onKeyDown)
      document.addEventListener('visibilitychange', onVisibility)
      if (canHover) {
        root.addEventListener('mouseenter', onMouseEnter)
        root.addEventListener('mouseleave', onMouseLeave)
      }

      playback.startProgress(0)

      return () => {
        root.removeEventListener('focusin', onFocusIn)
        root.removeEventListener('focusout', onFocusOut)
        root.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('visibilitychange', onVisibility)
        root.removeEventListener('mouseenter', onMouseEnter)
        root.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    { scope: rootRef },
  )

  return (
    <div className="about__desktop">
      <div className="about__heading">
        <p className={`about__pill ${bodyClassName}`}>Key Benefits</p>
        <h2 className="about__title">
          Intelligent control for autonomous operations.
        </h2>
        <p className={`about__body ${bodyClassName}`}>
          Forte combines intelligent <span className="about__emphasis">mission control</span> with{' '}
          <span className="about__emphasis">autonomous drone fleets</span> to help security teams see
          more, <span className="about__emphasis">coordinate faster</span>, and operate with{' '}
          <span className="about__emphasis">greater control</span>.
        </p>
      </div>
      <div
        aria-label="Key benefits"
        aria-roledescription="carousel"
        className={`about-cards ${bodyClassName}`}
        ref={rootRef}
      >
        <div className="about-cards__row">
          {aboutSlides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <article
                aria-hidden={!isActive}
                className={isActive ? 'about-cards__card is-active' : 'about-cards__card'}
                key={slide.title}
              >
                <img
                  alt={isActive ? '' : slide.alt}
                  className="about-cards__image about-cards__image--heading"
                  draggable={false}
                  height={slide.headingHeight}
                  src={slide.headingSrc}
                  width={slide.headingWidth}
                />
                <img
                  alt={isActive ? slide.alt : ''}
                  className="about-cards__image about-cards__image--extended"
                  draggable={false}
                  height={slide.extendedHeight}
                  src={slide.extendedSrc}
                  width={slide.extendedWidth}
                />
                <div className="about-cards__caption">
                  <div aria-hidden="true" className="about-cards__caption-fill" />
                  <div aria-hidden="true" className="about-cards__caption-gradient" />
                  <div className="about-cards__copy">
                    <h3 className="about-cards__title">{slide.title}</h3>
                    <p aria-hidden={!isActive} className="about-cards__description">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div aria-label="Choose a benefit" className="about-cards__indicators" role="group">
          {aboutSlides.map((slide, index) => (
            <button
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-label={slide.title}
              className="about-cards__indicator"
              key={slide.title}
              type="button"
              onClick={() => goToRef.current(index)}
            >
              <span aria-hidden="true" className="about-cards__indicator-fill" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
