'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { sitePages } from './site-nav'

gsap.registerPlugin(useGSAP)

export function SiteHeader({
  bodyClassName,
  children,
  showMenu = true,
  solid = false,
}: {
  bodyClassName: string
  children: React.ReactNode
  showMenu?: boolean
  solid?: boolean
}) {
  const headerRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const openRef = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { contextSafe } = useGSAP({ scope: headerRef })

  useLayoutEffect(() => {
    const update = () => setScrolled(window.scrollY > 0)

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useLayoutEffect(() => {
    if (open) return

    timelineRef.current?.kill()
    timelineRef.current = null

    const root = headerRef.current
    if (!root) return

    gsap.set(root, { clearProps: 'clipPath' })
    gsap.set(root.querySelectorAll('.empty-stage__menu, .empty-stage__close, .empty-stage__panel-inner'), {
      clearProps: 'opacity,visibility',
    })
  }, [open])

  const openMenu = contextSafe(() => {
    if (openRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const rootBefore = headerRef.current
    const closedHeight = rootBefore?.offsetHeight ?? 70

    flushSync(() => {
      openRef.current = true
      setOpen(true)
    })

    const root = headerRef.current
    if (!root || reducedMotion) return

    const hidden = Math.max(root.offsetHeight - closedHeight, 0)
    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

    timeline.set('.empty-stage__menu', { pointerEvents: 'none' }, 0)
    timeline.set('.empty-stage__close', { pointerEvents: 'none' }, 0)
    timeline.fromTo(
      root,
      { clipPath: `inset(0px 0px ${hidden}px 0px round 12px)` },
      { clipPath: 'inset(0px 0px 0px 0px round 12px)', duration: 0.42, ease: 'power2.out' },
      0,
    )
    timeline.to('.empty-stage__menu', { autoAlpha: 0, duration: 0.16, ease: 'power1.out' }, 0)
    timeline.fromTo(
      '.empty-stage__close',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.2, ease: 'power1.out' },
      0.06,
    )
    timeline.fromTo(
      '.empty-stage__panel-inner',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.28, ease: 'power1.out' },
      0.1,
    )
    timeline.set('.empty-stage__close', { pointerEvents: 'auto' }, 0.16)

    timelineRef.current = timeline
  })

  const closeMenu = contextSafe(() => {
    if (!openRef.current) return

    const timeline = timelineRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!timeline || reducedMotion) {
      openRef.current = false
      setOpen(false)
      return
    }

    timeline.eventCallback('onReverseComplete', () => {
      openRef.current = false
      setOpen(false)
    })
    timeline.reverse()
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
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={className} ref={headerRef}>
      <div className="empty-stage__bar-row">
        {children}
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
            <button aria-label="Close" className="empty-stage__close" type="button" onClick={closeMenu}>
              <img alt="" height={20} src="/x-close.svg" width={20} />
            </button>
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
