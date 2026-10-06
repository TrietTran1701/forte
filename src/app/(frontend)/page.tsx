import { Google_Sans_Flex, Wix_Madefor_Display } from 'next/font/google'
import React from 'react'

import './styles.css'

const bodyFont = Google_Sans_Flex({
  subsets: ['latin'],
  weight: '500',
})

const displayFont = Wix_Madefor_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
})

const navItems = ['Products', 'Applications', 'Technology', 'About Us']

export const metadata = {
  description: 'We’re working on something great. Please check back later.',
  title: 'Page Under Construction',
}

export default function HomePage() {
  return (
    <div className={`empty-stage ${displayFont.className}`}>
      <header className="empty-stage__bar">
        <img alt="Forte" className="empty-stage__logo" height={44} src="/logo.svg" width={44} />
        <div className="empty-stage__actions">
          <nav aria-label="Primary" className={bodyFont.className}>
            <ul className="empty-stage__nav">
              {navItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </nav>
          <button className={`empty-stage__contact ${bodyFont.className}`} disabled type="button">
            Contact Us
          </button>
        </div>
      </header>
      <section className="empty-stage__content">
        <img
          alt=""
          className="empty-stage__illustration"
          height={448}
          src="/images/Empty%20Stage%20(Desktop).png.png"
          width={384}
        />
        <div className="empty-stage__copy">
          <h1>Page Under Construction</h1>
          <p>
            We’re working on something great.
            <br />
            Please check back later.
          </p>
        </div>
      </section>
    </div>
  )
}
