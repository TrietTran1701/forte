'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

import { EASE_SCROLL } from './eases'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Matches the prototype's Smart Animate duration. */
const SCROLL_SECONDS = 2.5

/**
 * Offsets from the prototype's pre-enter frames. Each line starts lower than
 * the one above it, then they pull together as the section arrives.
 */
const DESKTOP_HEADING_RISE = [104, 216, 440]
const MOBILE_HEADING_RISE = [32, 72, 128]

/** Extra rise, beyond the page scroll, that un-staggers the customer row. */
const CARD_RISE = [336, 464, 568, 816]

/** Mobile product card grows from the centered 188px frame to the full 375px card. */
const MOBILE_PRODUCT_SCALE = 188 / 375

const LINE_SELECTORS = [
  '.about__pill, .product__pill, .customers__pill, .about__eyebrow, .product__eyebrow, .customers__eyebrow',
  '.about__title, .product__title, .customers__title',
  '.about__body, .product__body, .customers__body',
]

export function HomeScroll() {
  const markerRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const stage = markerRef.current?.closest('.empty-stage--home')
      if (!stage) return

      const motion = gsap.matchMedia()

      motion.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        mount(stage, true)
      })

      motion.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        mount(stage, false)
      })
    },
    { scope: markerRef },
  )

  return <span hidden ref={markerRef} />
}

function mount(stage: Element, desktop: boolean) {
  const rise = desktop ? DESKTOP_HEADING_RISE : MOBILE_HEADING_RISE

  play(stage.querySelector('.about'), (timeline) => {
    spread(
      timeline,
      stage.querySelector('.about'),
      desktop ? '.about__heading' : '.about__copy',
      rise,
    )
  })

  play(stage.querySelector('.product'), (timeline) => {
    const section = stage.querySelector('.product')
    spread(timeline, section, desktop ? '.product__heading' : '.product__copy', rise)
    if (!section) return
    if (desktop) drop(timeline, section.querySelector('.product-stage'), { y: 184 })
    else {
      drop(timeline, section.querySelector('.product-carousel'), {
        scale: MOBILE_PRODUCT_SCALE,
        transformOrigin: 'center center',
      })
    }
  })

  play(stage.querySelector('.customers'), (timeline) => {
    const section = stage.querySelector('.customers')
    spread(timeline, section, desktop ? '.customers__heading' : '.customers__copy', rise)
    if (!desktop || !section) return
    drop(timeline, gsap.utils.toArray<HTMLElement>('.customers-grid__card', section), {
      y: (index: number) => CARD_RISE[index] ?? CARD_RISE[CARD_RISE.length - 1],
    })
  })
}

function spread(
  timeline: gsap.core.Timeline,
  section: Element | null,
  boxSelector: string,
  rise: number[],
) {
  const box = section?.querySelector(boxSelector)
  if (!box) return
  const lines = LINE_SELECTORS.map((selector) => box.querySelector<HTMLElement>(selector)).filter(
    (line): line is HTMLElement => Boolean(line),
  )
  gsap.set(box, { overflow: 'hidden' })
  drop(timeline, lines, { y: (index: number) => rise[index] ?? rise[rise.length - 1] })
}

function drop(timeline: gsap.core.Timeline, target: gsap.TweenTarget, from: gsap.TweenVars) {
  if (!target || (Array.isArray(target) && target.length === 0)) return
  gsap.set(target, from)
  timeline.to(target, { ...zero(from) }, 0)
}

function zero(from: gsap.TweenVars): gsap.TweenVars {
  const to: gsap.TweenVars = {}
  for (const key of Object.keys(from)) {
    if (key === 'transformOrigin') continue
    to[key] = typeof from[key] === 'function' ? 0 : key === 'scale' ? 1 : 0
  }
  return to
}

function play(trigger: Element | null, build: (timeline: gsap.core.Timeline) => void) {
  if (!trigger) return
  const timeline = gsap.timeline({
    paused: true,
    defaults: { duration: SCROLL_SECONDS, ease: EASE_SCROLL },
  })
  build(timeline)
  ScrollTrigger.create({
    trigger,
    start: 'top 82%',
    animation: timeline,
    toggleActions: 'restart none none reverse',
  })
}
