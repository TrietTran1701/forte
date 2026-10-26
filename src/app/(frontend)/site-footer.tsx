import React from 'react'

export function SiteFooter({ bodyClassName }: { bodyClassName: string }) {
  return (
    <footer className={`footer ${bodyClassName}`}>
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
              <p className="footer__heading">Product</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="footer__link" href="/#product-heading">
                    Overview
                  </a>
                </li>
                <li className="footer__item">
                  <a className="footer__link" href="/#product-heading">
                    Solutions
                  </a>
                  <span className="footer__badge">New</span>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <p className="footer__heading">Company</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="footer__link" href="/#about-heading">
                    About us
                  </a>
                </li>
                <li className="footer__item">
                  <a className="footer__link" href="/#contact">
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
