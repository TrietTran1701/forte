'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

import { EASE_CAROUSEL, EASE_IN_OUT } from './eases'

gsap.registerPlugin(useGSAP)

const DESIGN_WIDTH = 1276
const LARGE = { width: 591, height: 392 }
const SMALL = { width: 327, height: 216 }
const SLIDE_SECONDS = 0.5

type ProductSlide = {
  src: string
  alt: string
  title: string
  description: string
}

const productSlides: ProductSlide[] = [
  {
    src: '/images/home/product-connect.png',
    alt: 'Forte dashboard coordinating connected drones, docks, and fleet telemetry',
    title: 'Connect.',
    description:
      'Integrate compatible drones and existing security systems through Forte’s software platform and open API.',
  },
  {
    src: '/images/home/product-monitor.png',
    alt: 'Forte monitor with live patrol routes, fleet status, and a restricted-zone alert',
    title: 'Monitor.',
    description:
      'Define patrol areas, schedule missions, and let drones monitor large or hard-to-cover environments with fewer blind spots.',
  },
  {
    src: '/images/home/product-respond.png',
    alt: 'Forte incident console detecting a perimeter breach and dispatching drones',
    title: 'Respond.',
    description:
      'Receive real-time alerts, review live feeds, and deploy drones quickly when an incident requires attention.',
  },
]

export function ProductDesktop({ bodyClassName }: { bodyClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const goToRef = useRef<(index: number) => void>(() => {})
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = productSlides.length - 1

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current
      const viewport = root?.querySelector<HTMLElement>('.product-stage__viewport')
      const track = root?.querySelector<HTMLElement>('.product-stage__track')
      if (!root || !viewport || !track || !contextSafe) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const indexRef = { current: 0 }
      const slides = gsap.utils.toArray<HTMLElement>('.product-stage__slide', track)

      const metrics = () => {
        const scale = viewport.offsetWidth / DESIGN_WIDTH
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 24 * scale
        return {
          largeW: LARGE.width * scale,
          largeH: LARGE.height * scale,
          smallW: SMALL.width * scale,
          smallH: SMALL.height * scale,
          gap,
        }
      }

      const place = (
        index: number,
        animate: boolean,
        motion?: { duration: number; ease: gsap.Ease },
      ) => {
        const { largeW, largeH, smallW, smallH, gap } = metrics()
        const duration = animate && !reducedMotion ? (motion?.duration ?? SLIDE_SECONDS) : 0
        const ease = motion?.ease ?? EASE_IN_OUT
        let activeLeft = 0

        slides.forEach((slide, slideIndex) => {
          const active = slideIndex === index
          if (slideIndex < index) activeLeft += smallW + gap
          gsap.to(slide, {
            width: active ? largeW : smallW,
            height: active ? largeH : smallH,
            opacity: active ? 1 : 0.3,
            duration,
            ease,
            overwrite: 'auto',
          })
        })

        gsap.to(track, {
          x: viewport.offsetWidth / 2 - activeLeft - largeW / 2,
          duration,
          ease,
          overwrite: 'auto',
        })
      }

      const playback = {
        goTo: (_next: number, _motion?: { duration: number; ease: gsap.Ease }) => {},
      }

      playback.goTo = contextSafe((next: number, motion?: { duration: number; ease: gsap.Ease }) => {
        const index = Math.max(0, Math.min(lastIndex, next))
        if (index === indexRef.current) return
        indexRef.current = index
        setActiveIndex(index)
        place(index, true, motion)
      })

      goToRef.current = playback.goTo

      const onResize = contextSafe(() => {
        place(indexRef.current, false)
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

      root.addEventListener('keydown', onKeyDown)
      window.addEventListener('resize', onResize)
      let productTimer = 0
      const onProductShown = () => {
        window.clearTimeout(productTimer)
        productTimer = window.setTimeout(() => {
          if (indexRef.current !== 0) return
          playback.goTo(1, { duration: 2, ease: EASE_CAROUSEL })
        }, 2000)
      }
      window.addEventListener('forte-product-shown', onProductShown)
      place(0, false)

      return () => {
        window.clearTimeout(productTimer)
        window.removeEventListener('forte-product-shown', onProductShown)
        root.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: rootRef },
  )

  return (
    <div className="product__desktop">
      <div className="product__heading">
        <p className={`product__pill ${bodyClassName}`}>Industry solutions</p>
        <h2 className="product__title">One mission. Multiple drones. AI-assisted control.</h2>
        <p className={`product__body ${bodyClassName}`}>
          Forte brings intelligent surveillance software and autonomous drones together in one
          platform, enabling teams to coordinate multi-drone missions, monitor complex sites, and
          respond faster with AI-supported analysis.
        </p>
      </div>
      <div
        aria-label="Industry solutions"
        aria-roledescription="carousel"
        className={`product-stage ${bodyClassName}`}
        ref={rootRef}
      >
        <div className="product-stage__viewport">
          <div className="product-stage__track">
            {productSlides.map((slide, index) => {
              const isActive = index === activeIndex

              return (
                <article
                  aria-hidden={!isActive}
                  className={isActive ? 'product-stage__slide is-active' : 'product-stage__slide'}
                  key={slide.title}
                >
                  <img
                    alt={isActive ? slide.alt : ''}
                    className="product-stage__image"
                    draggable={false}
                    height={1018}
                    src={slide.src}
                    width={1545}
                  />
                </article>
              )
            })}
          </div>
        </div>
        <div className="product-stage__bar">
          <button
            aria-label="Previous solution"
            className="product-stage__nav product-stage__nav--prev"
            disabled={activeIndex === 0}
            type="button"
            onClick={() => goToRef.current(activeIndex - 1)}
          >
            <img
              alt=""
              className="product-stage__icon"
              height={20}
              src={
                activeIndex === 0
                  ? '/images/home/chevron-left-disabled.svg'
                  : '/images/home/chevron-left.svg'
              }
              width={20}
            />
          </button>
          <div className="product-stage__captions">
            {productSlides.map((slide, index) => {
              const isActive = index === activeIndex

              return (
                <p
                  aria-hidden={!isActive}
                  className={isActive ? 'product-stage__caption is-active' : 'product-stage__caption'}
                  key={slide.title}
                >
                  <span className="product-stage__label">{slide.title}</span>{' '}
                  <span className="product-stage__detail">{slide.description}</span>
                </p>
              )
            })}
          </div>
          <button
            aria-label="Next solution"
            className="product-stage__nav product-stage__nav--next"
            disabled={activeIndex === lastIndex}
            type="button"
            onClick={() => goToRef.current(activeIndex + 1)}
          >
            <img
              alt=""
              className="product-stage__icon"
              height={20}
              src={
                activeIndex === lastIndex
                  ? '/images/home/chevron-right-disabled.svg'
                  : '/images/home/chevron-right.svg'
              }
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
