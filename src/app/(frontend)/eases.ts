import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

/** CSS `ease-in-out` — cubic-bezier(0.42, 0, 0.58, 1). */
export const EASE_IN_OUT = CustomEase.create('forteEaseInOut', 'M0,0 C0.42,0 0.58,1 1,1')

/** Indicator fill sweep — cubic-bezier(0.449, 0.008, 0.492, 0.996). */
export const EASE_INDICATOR = CustomEase.create(
  'forteIndicator',
  'M0,0 C0.449,0.008 0.492,0.996 1,1',
)
