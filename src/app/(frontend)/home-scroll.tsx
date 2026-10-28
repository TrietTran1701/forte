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
const PRODUCT_HEADING_RISE = [0, 176, 320]
const CUSTOMER_HEADING_RISE = [96, 320, 480]
const MOBILE_HEADING_RISE = [32, 72, 128]

/** Extra rise, beyond the page scroll, that un-staggers the customer row. */
const CARD_RISE = [336, 464, 568, 816]

/** About cards climb into the row. On a phone the first card is already seated. */
const ABOUT_CARD_RISE = [432, 528, 776]
const MOBILE_ABOUT_CARD_RISE = [0, 344, 512]
const MOBILE_CUSTOMER_RISE = 360

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

/** Same entrance as the home sections, for the pages below the home hero. */
export function PageScroll() {
  const markerRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const stage = markerRef.current?.closest('.empty-stage')
      if (!stage || stage.classList.contains('empty-stage--home')) return

      const motion = gsap.matchMedia()

      motion.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        mountPages(stage, true)
      })

      motion.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        mountPages(stage, false)
      })
    },
    { scope: markerRef },
  )

  return <span hidden ref={markerRef} />
}

function mount(stage: Element, desktop: boolean) {
  const rise = desktop ? DESKTOP_HEADING_RISE : MOBILE_HEADING_RISE

  play(stage.querySelector('.about'), desktop, (timeline) => {
    const section = stage.querySelector('.about')
    spread(timeline, section, desktop ? '.about__heading' : '.about__copy', rise, desktop)
    if (!section) return
    drop(
      timeline,
      gsap.utils.toArray<HTMLElement>(
        desktop ? '.about-cards__card' : '.card-carousel__card',
        section,
      ),
      {
        y: (index: number) => (desktop ? ABOUT_CARD_RISE : MOBILE_ABOUT_CARD_RISE)[index] ?? 0,
      },
    )
  })

  play(stage.querySelector('.product'), desktop, (timeline) => {
    const section = stage.querySelector('.product')
    spread(
      timeline,
      section,
      desktop ? '.product__heading' : '.product__copy',
      desktop ? PRODUCT_HEADING_RISE : rise,
      desktop,
    )
    if (!section || desktop) return
    drop(timeline, section.querySelector('.product-carousel'), {
      scale: MOBILE_PRODUCT_SCALE,
      transformOrigin: 'center center',
    })
  })

  play(stage.querySelector('.customers'), desktop, (timeline) => {
    const section = stage.querySelector('.customers')
    spread(
      timeline,
      section,
      desktop ? '.customers__heading' : '.customers__copy',
      desktop ? CUSTOMER_HEADING_RISE : rise,
      desktop,
    )
    if (!section) return
    if (desktop) {
      drop(timeline, gsap.utils.toArray<HTMLElement>('.customers-grid__card', section), {
        y: (index: number) => CARD_RISE[index] ?? CARD_RISE[CARD_RISE.length - 1],
      })
      return
    }
    drop(timeline, gsap.utils.toArray<HTMLElement>('.customers-carousel__card', section), {
      y: (index: number) => (index === 0 ? 0 : MOBILE_CUSTOMER_RISE),
    })
  })

  if (!desktop) return
  const product = stage.querySelector('.product')
  if (!product) return
  ScrollTrigger.create({
    trigger: product,
    start: 'top 40%',
    once: true,
    onEnter: () => window.dispatchEvent(new CustomEvent('forte-product-shown')),
  })
}

type Entrance = {
  trigger: string
  box: string
  lines: string[]
  items?: string
}

function mountPages(stage: Element, desktop: boolean) {
  const sections: Entrance[] = desktop
    ? [
        {
          trigger: '.software',
          box: '.software__heading',
          lines: ['.software__pill', '.software__title', '.software__lead'],
          items: '.software__row',
        },
        {
          trigger: '.hardware',
          box: '.hardware__heading',
          lines: ['.hardware__pill', '.hardware__title', '.hardware__lead'],
          items: '.hardware__tile',
        },
        {
          trigger: '.product-contact',
          box: '.contact__copy',
          lines: ['.contact__title', '.product-contact__body'],
          items: '.product-contact__form',
        },
        {
          trigger: '.ideal',
          box: '.ideal__heading',
          lines: ['.ideal__pill', '.ideal__desktop-title', '.ideal__lead'],
          items: '.ideal__card',
        },
        {
          trigger: '.response',
          box: '.response__heading',
          lines: ['.response__pill', '.response__desktop-title', '.response__desktop-body'],
          items: '.response__benefit',
        },
        {
          trigger: '.app-contact',
          box: '.app-contact__copy',
          lines: ['.app-contact__title', '.app-contact__body'],
          items: '.app-contact__form',
        },
        {
          trigger: '.team',
          box: '.team__heading-block',
          lines: ['.team__pill', '.team__desktop-title', '.team__lead'],
          items: '.team__feature',
        },
        {
          trigger: '.partners',
          box: '.partners__heading',
          lines: ['.partners__pill', '.partners__desktop-title', '.partners__lead'],
          items: '.partners__row',
        },
        {
          trigger: '.contact-hero',
          box: '.contact__copy',
          lines: ['.contact__eyebrow', '.contact__title', '.contact__benefits'],
          items: '.contact__form',
        },
      ]
    : [
        {
          trigger: '.software',
          box: '.product__copy',
          lines: ['.product__eyebrow', '.product__title', '.product__body'],
          items: '.software-carousel__card',
        },
        {
          trigger: '.hardware',
          box: '.product__copy',
          lines: ['.product__eyebrow', '.product__title', '.product__body'],
          items: '.hardware__card',
        },
        {
          trigger: '.product-contact',
          box: '.contact__copy',
          lines: ['.contact__title', '.product-contact__body'],
          items: '.product-contact__form',
        },
        {
          trigger: '.ideal',
          box: '.ideal__copy',
          lines: ['.ideal__eyebrow', '.ideal__title', '.ideal__body'],
          items: '.ideal-carousel__card',
        },
        {
          trigger: '.response',
          box: '.response__copy',
          lines: ['.response__eyebrow', '.response__title', '.response__body'],
          items: '.response__item',
        },
        {
          trigger: '.app-contact',
          box: '.app-contact__copy',
          lines: ['.app-contact__eyebrow', '.app-contact__title', '.app-contact__body'],
          items: '.app-contact__form',
        },
        {
          trigger: '.team',
          box: '.team__copy',
          lines: ['.team__eyebrow', '.team__title', '.team__body'],
          items: '.team__item',
        },
        {
          trigger: '.partners',
          box: '.partners__copy',
          lines: ['.partners__eyebrow', '.partners__title', '.partners__body'],
          items: '.partners__card',
        },
        {
          trigger: '.contact-hero',
          box: '.contact__copy',
          lines: ['.contact__eyebrow', '.contact__title', '.contact__benefits'],
          items: '.contact__form',
        },
      ]

  const heading = desktop ? DESKTOP_HEADING_RISE : MOBILE_HEADING_RISE
  const itemY = (index: number) =>
    (desktop ? 480 : 160) + Math.min(index, 5) * (desktop ? 80 : 40)

  for (const section of sections) {
    const trigger = stage.querySelector(section.trigger)
    play(trigger, desktop, (timeline) => {
      if (!trigger) return
      const box = trigger.querySelector(section.box)
      const lines = section.lines
        .map((selector) => box?.querySelector<HTMLElement>(selector))
        .filter((line): line is HTMLElement => Boolean(line))
      if (!desktop && box) gsap.set(box, { overflow: 'hidden' })
      drop(timeline, lines, { y: (index: number) => heading[index] ?? heading[heading.length - 1] })
      if (!section.items) return
      drop(timeline, gsap.utils.toArray<HTMLElement>(section.items, trigger), { y: itemY })
    })
  }
}

function spread(
  timeline: gsap.core.Timeline,
  section: Element | null,
  boxSelector: string,
  rise: number[],
  visible: boolean,
) {
  const box = section?.querySelector(boxSelector)
  if (!box) return
  const lines = LINE_SELECTORS.map((selector) => box.querySelector<HTMLElement>(selector)).filter(
    (line): line is HTMLElement => Boolean(line),
  )
  if (!visible) gsap.set(box, { overflow: 'hidden' })
  drop(timeline, lines, { y: (index: number) => rise[index] ?? rise[rise.length - 1] })
}

function drop(timeline: gsap.core.Timeline, target: gsap.TweenTarget, from: gsap.TweenVars) {
  if (!target || (Array.isArray(target) && target.length === 0)) return
  // fromTo keeps the start offset. set() then to() collapsed these to a
  // zero-duration tween, so the content never left its seated position.
  timeline.fromTo(target, from, { ...zero(from), duration: SCROLL_SECONDS, ease: EASE_SCROLL }, 0)
}

function zero(from: gsap.TweenVars): gsap.TweenVars {
  const to: gsap.TweenVars = {}
  for (const key of Object.keys(from)) {
    if (key === 'transformOrigin') continue
    to[key] = typeof from[key] === 'function' ? 0 : key === 'scale' ? 1 : 0
  }
  return to
}

function play(
  trigger: Element | null,
  desktop: boolean,
  build: (timeline: gsap.core.Timeline) => void,
) {
  if (!trigger) return
  const timeline = gsap.timeline({
    paused: true,
    defaults: { duration: SCROLL_SECONDS, ease: EASE_SCROLL },
  })
  build(timeline)
  ScrollTrigger.create(
    desktop
      ? {
          // Prototype smart-animate: 2.5s, cubic-bezier(0.48, 0.01, 0.28, 0.99).
          // The timeline duration is that clock. Scrubbing it to scroll distance
          // finished the rise as fast as the wheel moved.
          trigger,
          start: 'top bottom',
          animation: timeline,
          toggleActions: 'play none none reverse',
        }
      : {
          trigger,
          start: 'top 82%',
          animation: timeline,
          toggleActions: 'restart none none reverse',
        },
  )
}
