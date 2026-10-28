/**
 * Both marks are rendered and cross-faded by CSS off the header's state classes,
 * so no client state is needed. The light mark is the default over a hero. Once
 * the bar leaves the hero and turns transparent, the standard mark takes over.
 */
export function SiteLogo() {
  return (
    <a aria-label="Forte" className="empty-stage__home" href="/">
      <span className="empty-stage__logo">
        <img
          alt=""
          className="empty-stage__logo-mark empty-stage__logo-mark--light"
          height={44}
          src="/logo-light.svg"
          width={44}
        />
        <img
          alt=""
          className="empty-stage__logo-mark empty-stage__logo-mark--dark"
          height={44}
          src="/logo.svg"
          width={44}
        />
      </span>
    </a>
  )
}
