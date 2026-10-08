'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { sitePages } from './site-nav'

gsap.registerPlugin(useGSAP)

const MENU = '.empty-stage__menu'
const CLOSE = '.empty-stage__close'
const PANEL = '.empty-stage__panel'
const PANEL_INNER = '.empty-stage__panel-inner'
const COMPACT = '.empty-stage__compact'

const closedClip = (hidden: number) => `inset(0px 0px ${hidden}px 0px round 12px)`

/** Drops every inline property the open/close timelines write, so CSS owns the resting state. */
function resetProps(root: HTMLElement) {
  root.style.removeProperty('clip-path')
  gsap.set(root.querySelectorAll(`${MENU}, ${CLOSE}, ${COMPACT}, ${PANEL_INNER}`), {
    clearProps: 'opacity,visibility,pointerEvents',
  })
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function SiteHeader({
  bodyClassName,
  children,
  compactActions = 'never',
  showMenu = true,
  solid = false,
}: {
  bodyClassName: string
  children: React.ReactNode
  /**
   * Controls the mobile Explore/Contact pair, which replaces the hamburger:
   * `past-hero` swaps them in once the bar clears the hero, `always` shows them
   * on a page that has no hero to sit over.
   */
  compactActions?: 'never' | 'past-hero' | 'always'
  showMenu?: boolean
  solid?: boolean
}) {
  const headerRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const openRef = useRef(false)
  // The clip is driven through this proxy instead of tweening the `clip-path` string:
  // the browser reports the computed value in shorthand form, which GSAP would
  // interpolate term-by-term against a longhand target and garble the corner radius.
  const clipRef = useRef({ hidden: 0 })
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)
  const { contextSafe } = useGSAP({ scope: headerRef })

  // `always` has no hero to measure against, so the compact pair is the resting state.
  const compact = compactActions === 'always' || (compactActions === 'past-hero' && pastHero)

  useLayoutEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 0)

      if (compactActions !== 'past-hero') return

      const hero = document.querySelector('.hero')
      // Measured against the bar row rather than the header, whose height changes
      // while the panel is open and would flip this mid-animation.
      const row = headerRef.current?.querySelector('.empty-stage__bar-row')
      if (!hero || !row) return

      setPastHero(hero.getBoundingClientRect().bottom <= row.getBoundingClientRect().bottom)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [compactActions])

  useLayoutEffect(() => {
    if (open) return

    timelineRef.current?.kill()
    timelineRef.current = null

    const root = headerRef.current
    if (!root) return

    resetProps(root)
  }, [open, compact])

  /** Height the panel adds to the bar, measured now — never cached across an open/close cycle. */
  const measureHidden = (root: HTMLElement) =>
    (root.querySelector(PANEL) as HTMLElement | null)?.offsetHeight ?? 0

  const writeClip = (root: HTMLElement) => {
    root.style.clipPath = closedClip(clipRef.current.hidden)
  }

  const openMenu = contextSafe(() => {
    if (openRef.current) return

    // Closing but not finished yet: `open` is still true, so there is nothing to mount.
    const fromClosed = !open

    openRef.current = true
    if (fromClosed) flushSync(() => setOpen(true))

    timelineRef.current?.kill()
    timelineRef.current = null

    const root = headerRef.current
    if (!root) return

    // Whichever control is currently on screen is the one that animates out.
    const trigger = compact ? COMPACT : MENU

    if (prefersReducedMotion()) {
      // Jump to the open end state. CSS parks the close button at
      // visibility: hidden, so without this it stays untappable.
      resetProps(root)
      gsap.set(trigger, { autoAlpha: 0, pointerEvents: 'none' })
      gsap.set(CLOSE, { autoAlpha: 1, pointerEvents: 'auto' })
      return
    }

    const hidden = measureHidden(root)

    // Coming from rest, CSS has no inline values to tween from; coming from an
    // interrupted close, the current inline values are the right starting point.
    if (fromClosed) {
      clipRef.current.hidden = hidden
      writeClip(root)
      gsap.set(PANEL_INNER, { autoAlpha: 0 })
      gsap.set(CLOSE, { autoAlpha: 0 })
      gsap.set(trigger, { autoAlpha: 1 })
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

    timeline.set(trigger, { pointerEvents: 'none' }, 0)
    timeline.set(CLOSE, { pointerEvents: 'none' }, 0)
    timeline.to(
      clipRef.current,
      { hidden: 0, duration: 0.42, ease: 'power2.out', onUpdate: () => writeClip(root) },
      0,
    )
    timeline.to(trigger, { autoAlpha: 0, duration: 0.16, ease: 'power1.out' }, 0)
    timeline.to(CLOSE, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, 0.06)
    timeline.to(PANEL_INNER, { autoAlpha: 1, duration: 0.28, ease: 'power1.out' }, 0.1)
    timeline.set(CLOSE, { pointerEvents: 'auto' }, 0.16)

    timelineRef.current = timeline
  })

  // Built as its own forward timeline rather than reversing the open one: reversing
  // also reverses the easing (making the collapse stall for most of its duration)
  // and the ordering (leaving an empty panel on screen after the links have gone).
  const closeMenu = contextSafe(() => {
    if (!openRef.current) return

    openRef.current = false

    timelineRef.current?.kill()
    timelineRef.current = null

    const root = headerRef.current
    if (!root || prefersReducedMotion()) {
      setOpen(false)
      return
    }

    const trigger = compact ? COMPACT : MENU
    const hidden = measureHidden(root)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => setOpen(false),
    })

    timeline.set(trigger, { pointerEvents: 'none' }, 0)
    timeline.set(CLOSE, { pointerEvents: 'none' }, 0)
    // `power1.in` keeps the links readable while the collapsing edge eats into them,
    // instead of emptying the panel and leaving a bare white block behind.
    timeline.to(PANEL_INNER, { autoAlpha: 0, duration: 0.26, ease: 'power1.in' }, 0)
    timeline.to(CLOSE, { autoAlpha: 0, duration: 0.14, ease: 'power1.out' }, 0)
    timeline.to(
      clipRef.current,
      { hidden, duration: 0.32, onUpdate: () => writeClip(root) },
      0.04,
    )
    timeline.to(trigger, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, 0.12)
    // Re-arm the trigger as soon as it is visible, so a tap during the collapse
    // reopens from wherever the clip currently is instead of being swallowed.
    timeline.set(trigger, { pointerEvents: 'auto' }, 0.2)

    timelineRef.current = timeline
  })

  useLayoutEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, closeMenu])

  const className = [
    'empty-stage__bar',
    solid || scrolled ? 'empty-stage__bar--scrolled' : '',
    open ? 'empty-stage__bar--open' : '',
    compact ? 'empty-stage__bar--compact' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={className} ref={headerRef}>
      <div className="empty-stage__bar-row">
        {children}
        {showMenu || compactActions !== 'never' ? (
          <div className="empty-stage__controls">
            {showMenu ? (
              <div className="empty-stage__toggle">
                <button
                  aria-controls="mobile-menu"
                  aria-expanded={open}
                  aria-label="Menu"
                  className="empty-stage__menu"
                  type="button"
                  onClick={openMenu}
                >
                  <img alt="" height={24} src="/hamburger-icon.svg" width={24} />
                </button>
                <button
                  aria-label="Close"
                  className="empty-stage__close"
                  type="button"
                  onClick={closeMenu}
                >
                  <img alt="" height={20} src="/x-close.svg" width={20} />
                </button>
              </div>
            ) : null}
            {compactActions !== 'never' ? (
              <div className={`empty-stage__compact ${bodyClassName}`}>
                {/* With a menu to open, Explore is that trigger; without one there is
                    no panel to expand, so it stays a plain link home. */}
                {showMenu ? (
                  <button
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    className="empty-stage__explore"
                    type="button"
                    onClick={openMenu}
                  >
                    Explore
                  </button>
                ) : (
                  <a className="empty-stage__explore" href="/">
                    Explore
                  </a>
                )}
                <a className="empty-stage__contact-pill" href="/#contact">
                  Contact
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {showMenu ? (
        <nav aria-label="Mobile" className="empty-stage__panel" id="mobile-menu">
          <div className={`empty-stage__panel-inner ${bodyClassName}`}>
            <ul>
              {sitePages.map((page) => (
                <li key={page.slug}>
                  <a href={`/${page.slug}`}>{page.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
