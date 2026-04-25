import logo from '../assets/mernpixel-logo.svg'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <img src={logo} alt="MERNpixel" className="footer-logo" />

        <div className="footer-meta">
          <p>High-performance websites and applications for service businesses.</p>
          <p>(c) {year} MERNpixel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
