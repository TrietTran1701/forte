import React from 'react'

export function SiteFooter({
  bodyClassName,
  swapped = false,
}: {
  bodyClassName: string
  swapped?: boolean
}) {
  return (
    <footer className={`footer${swapped ? ' footer--swapped' : ''} ${bodyClassName}`}>
      <div className="footer__desktop">
        <div className="footer__identity">
          <img
            alt="Forte"
            className="footer__logo"
            height={725}
            src="/images/home/footer-logo.png"
            width={2169}
          />
          <p className="footer__tagline">
            Southeast Asia’s leading provider of autonomous drone-based security systems
          </p>
        </div>
        <div className="footer__links">
          <div className="footer__links-column">
            <p className="footer__links-heading">Overview</p>
            <ul className="footer__links-list">
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/applications">Applications</a>
              </li>
            </ul>
          </div>
          <div className="footer__links-column">
            <p className="footer__links-heading">Company</p>
            <ul className="footer__links-list">
              <li>
                <a href="/about-us">About us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer__links-column">
            <p className="footer__links-heading">Social</p>
            <ul className="footer__links-list">
              <li>
                <a href="#linkedin">LinkedIn</a>
              </li>
              <li>
                <a href="#facebook">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__main">
        <div className="footer__brand">
          <img
            alt="Forte"
            className="footer__logo"
            height={36}
            src="/images/footer-wordmark.png"
            width={108}
          />
          <p className="footer__tagline">
            Southeast Asia’s leading provider of autonomous drone-based security systems
          </p>
        </div>
        <div className="footer__nav">
          <div className="footer__columns">
            <div className="footer__column">
              <p className="footer__heading">Overview</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="footer__link" href="/products">
                    Products
                  </a>
                </li>
                <li className="footer__item">
                  <a className="footer__link" href="/applications">
                    Applications
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <p className="footer__heading">Company</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="footer__link" href="/about-us">
                    About us
                  </a>
                </li>
                <li className="footer__item">
                  <a className="footer__link" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__column">
            <p className="footer__heading">Social</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="footer__link" href="#linkedin">
                  LinkedIn
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#facebook">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        <div className="footer__bar-inner">
          <div className="footer__social">
            <a aria-label="LinkedIn" className="footer__icon-link" href="#linkedin">
              <img alt="" className="footer__icon" height={24} src="/linkedin.svg" width={24} />
            </a>
            <a aria-label="Facebook" className="footer__icon-link" href="#facebook">
              <img alt="" className="footer__icon" height={24} src="/facebook.svg" width={24} />
            </a>
          </div>
          <p className="footer__legal">© 2026 Forte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
