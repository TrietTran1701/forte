'use client'

import { useLayoutEffect } from 'react'

const mobileQuery = '(max-width: 767px)'

export function HeroFit() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia(mobileQuery)

    const measure = () => Math.round(window.visualViewport?.height ?? window.innerHeight)

    const apply = (reset: boolean) => {
      if (!media.matches) {
        root.style.removeProperty('--hero-height')
        delete root.dataset.heroHeight
        return
      }

      const height = measure()
      const previous = Number(root.dataset.heroHeight || 0)

      if (reset || !previous || height < previous) {
        root.dataset.heroHeight = String(height)
        root.style.setProperty('--hero-height', `${height}px`)
      }
    }

    apply(true)

    const onResize = () => apply(false)
    const onReset = () => apply(true)

    window.visualViewport?.addEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onReset)
    media.addEventListener('change', onReset)

    return () => {
      window.visualViewport?.removeEventListener('resize', onResize)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onReset)
      media.removeEventListener('change', onReset)
    }
  }, [])

  return null
}
