import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/css/footerstyle.css';

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-engitech-expo-team" },
  { label: "Exhibitors", href: "/exhibitors" },
  { label: "Visitors", href: "/visitors" },
  { label: "Stall Booking", href: "/stall-booking" },
  { label: "Sponsors & Partners", href: "/sponsors-partners" },
  { label: "Media & Gallery", href: "/media-gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const NAVBAR_CSS = `
  :root {
    --nt-navy:       #1a3a5c;
    --nt-navy-light: #1e4570;
    --nt-gold:       #ffc107;
    --nt-gold-hover: #ffd54f;
    --nt-gold-muted: rgba(255,193,7,0.12);
    --nt-text:       #1f2d3d;
    --nt-muted:      #6b7a8d;
    --nt-border:     rgba(0,0,0,0.07);
    --nt-bg:         #ffffff;
    --nt-radius:     6px;
    --nt-font:       'Segoe UI', system-ui, -apple-system, sans-serif;
    --nt-h:          72px;
    --nt-shadow-sm:  0 1px 4px rgba(0,0,0,0.06);
    --nt-shadow-md:  0 4px 20px rgba(0,0,0,0.10);
  }

  .nt-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--nt-bg);
    border-top: 3px solid var(--nt-gold);
    border-bottom: 1px solid var(--nt-border);
    box-shadow: var(--nt-shadow-sm);
    transition: box-shadow 0.3s ease;
  }
  .nt-header--scrolled { box-shadow: var(--nt-shadow-md); }

  .nt-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 32px;
    height: var(--nt-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .nt-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    outline: none;
  }
  .nt-logo:focus-visible { outline: 2px solid var(--nt-gold); outline-offset: 2px; }
  .nt-logo img {
    height: 48px !important;
    max-height: 48px !important;
    width: auto !important;
    display: block !important;
  }

  .nt-nav {
    flex: 1;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .nt-nav__list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 0;
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }
  .nt-nav__link {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 11px;
    font-family: var(--nt-font);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--nt-text);
    text-decoration: none;
    white-space: nowrap;
    border-radius: var(--nt-radius);
    transition: color 0.2s, background 0.2s;
  }
  .nt-nav__link:hover { color: var(--nt-navy); background: rgba(26,58,92,0.05); }
  .nt-nav__link:focus-visible { outline: 2px solid var(--nt-gold); outline-offset: 1px; }
  .nt-nav__link.is-active { color: var(--nt-gold); font-weight: 600; }
  .nt-nav__underline {
    position: absolute;
    bottom: 4px;
    left: 11px;
    right: 11px;
    height: 2px;
    background: var(--nt-gold);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  }
  .nt-nav__link:hover .nt-nav__underline,
  .nt-nav__link.is-active .nt-nav__underline { transform: scaleX(1); }

  .nt-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

  .nt-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--nt-font);
    font-size: 13.5px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    border-radius: var(--nt-radius);
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    white-space: nowrap;
    text-decoration: none;
  }
  .nt-btn--cta {
    background: var(--nt-gold);
    color: var(--nt-navy);
    padding: 10px 18px;
    box-shadow: 0 2px 8px rgba(255,193,7,0.35);
  }
  .nt-btn--cta:hover {
    background: var(--nt-gold-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(255,193,7,0.45);
    color: var(--nt-navy);
  }
  .nt-btn--cta:active { transform: translateY(0); box-shadow: none; }
  .nt-btn--cta:focus-visible { outline: 2px solid var(--nt-navy); outline-offset: 2px; }
  .nt-btn--cta svg { width: 15px; height: 15px; flex-shrink: 0; }
  .nt-btn--full { width: 100%; justify-content: center; padding: 13px 20px; font-size: 15px; }

  .nt-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1px solid var(--nt-border);
    border-radius: var(--nt-radius);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s;
  }
  .nt-hamburger:hover { background: rgba(26,58,92,0.06); }
  .nt-hamburger:focus-visible { outline: 2px solid var(--nt-gold); outline-offset: 2px; }
  .nt-hamburger span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--nt-navy);
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
    transform-origin: center;
  }
  .nt-hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nt-hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nt-hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .nt-drawer {
    display: none;
    flex-direction: column;
    position: fixed;
    top: calc(var(--nt-h) + 3px);
    left: 0;
    right: 0;
    background: var(--nt-bg);
    padding: 12px 20px 24px;
    gap: 4px;
    z-index: 999;
    box-shadow: var(--nt-shadow-md);
    border-top: 1px solid var(--nt-border);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
  }
  .nt-drawer.is-open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nt-drawer__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 16px;
    padding: 0;
  }
  .nt-drawer__link {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    font-family: var(--nt-font);
    font-size: 15px;
    font-weight: 500;
    color: var(--nt-text);
    text-decoration: none;
    border-radius: var(--nt-radius);
    border-left: 3px solid transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .nt-drawer__link:hover { background: rgba(26,58,92,0.05); color: var(--nt-navy); }
  .nt-drawer__link.is-active {
    background: var(--nt-gold-muted);
    color: var(--nt-gold);
    border-left-color: var(--nt-gold);
    font-weight: 600;
  }

  .nt-backdrop {
    position: fixed;
    inset: 0;
    top: calc(var(--nt-h) + 3px);
    background: rgba(15,25,40,0.4);
    backdrop-filter: blur(3px);
    z-index: 998;
    cursor: pointer;
    animation: nt-fade 0.2s ease;
  }
  @keyframes nt-fade { from { opacity: 0; } to { opacity: 1; } }

  @media (max-width: 1200px) {
    .nt-inner { padding: 0 24px; gap: 14px; }
    .nt-nav__link { font-size: 13px; padding: 8px 9px; }
  }
  @media (max-width: 1024px) {
    .nt-nav { display: none; }
    .nt-btn--cta:not(.nt-btn--full) { display: none; }
    .nt-hamburger { display: flex; }
    .nt-drawer { display: flex; }
  }
  @media (max-width: 767px) {
    .nt-inner { padding: 0 16px !important; }
    .nt-logo img {
      height: 34px !important;
      max-height: 34px !important;
      width: auto !important;
      max-width: 140px !important;
    }
  }
`;

function navIsActive(href, pathname) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

function Navbar({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const id = 'nt-styles';
    if (!document.getElementById(id)) {
      const tag = document.createElement('style');
      tag.id = id;
      tag.textContent = NAVBAR_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`nt-header${scrolled ? ' nt-header--scrolled' : ''}`}>
        <div className="nt-inner">

          <Link to="/" className="nt-logo">
            <img src="/images/engitech-2-1-768x274-1.png" alt="Engitech Expo" />
          </Link>

          <nav className="nt-nav" aria-label="Main navigation">
            <ul className="nt-nav__list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className={`nt-nav__link${navIsActive(l.href, pathname) ? ' is-active' : ''}`}
                  >
                    {l.label}
                    <span className="nt-nav__underline" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nt-actions">
            <a
              href="/Ahmedabad-2026-Rajkot-2027-Vadodara-2028-12-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nt-btn nt-btn--cta"
            >
              <DownloadIcon />
              <span>Download Brochure</span>
            </a>
            <button
              className={`nt-hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      <div className={`nt-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="nt-drawer__list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`nt-drawer__link${navIsActive(l.href, pathname) ? ' is-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="/Ahmedabad-2026-Rajkot-2027-Vadodara-2028-12-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nt-btn nt-btn--cta nt-btn--full"
        >
          <DownloadIcon />
          <span>Download Brochure</span>
        </a>
      </div>

      {menuOpen && (
        <div className="nt-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}

function Footer({ pathname }) {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Organiser */}
          <div className="footer-column">
            <img
              src="/images/engitech-2-1-768x274-1.png"
              alt="Engitech Expo"
              className="footer-brand-img"
            />
            <p className="footer-brand-text">
              Engitech Expo is a leading industrial exhibition where businesses explore cutting-edge technologies and global partnerships.
            </p>

            <div className="organiser-container">
              <div className="organiser-title">
                Organised By
              </div>
              <img
                src="/images/Shree-Communication-Logo-600x325-1.png"
                alt="Shree Communication"
                className="organiser-img"
              />
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="footer-column">
            <h3>Useful Links</h3>
            <div className="footer-links">
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.label}
                    to={l.href}
                    className={`footer-link-item ${active ? 'active' : ''}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: Corporate Office */}
          <div className="footer-column">
            <h3>Corporate Office</h3>
            <p className="footer-info-text">
              301, 3rd Floor, Krishna Complex, Nr. H.P. Petrol Pump, Wonder Point, CTM, Ahmedabad-26
            </p>

            <h3 className="footer-subheading">
              Head Office
            </h3>
            <p className="footer-info-text">
              408, RK Empire, Near Mavdi Circle, 150 Feet Ring Road, Rajkot – 360004.
            </p>

            <h3 className="footer-subheading branch">
              Branch
            </h3>
            <p className="footer-info-text mb-0">
              Vadodara
            </p>
          </div>

          {/* Column 4: Email / Phone & Social */}
          <div className="footer-column">
            <h3>Email Address</h3>
            <div className="footer-contact-item">
              <span className="footer-icon-size">✉</span>
              <a href="mailto:info@engitechexpo.com" className="footer-contact-link">
                info@engitechexpo.com
              </a>
            </div>

            <h3>Phone Number</h3>
            <div className="footer-contact-group">
              <div className="footer-contact-item mb-0">
                <span className="footer-icon-size">📞</span>
                <a href="tel:+919601945255" className="footer-contact-link">
                  +91 96019 45255
                </a>
              </div>
              <div className="footer-contact-item mb-0">
                <span className="footer-icon-size">📞</span>
                <a href="tel:+919574897793" className="footer-contact-link">
                  +91 95748 97793
                </a>
              </div>
            </div>

            <h3>Follow Us</h3>
            <div className="footer-social-list">
              {[
                {
                  href: "https://www.facebook.com/engitechexpo",
                  svg: (
                    <svg width="14" height="14" viewBox="0 0 320 512" fill="white">
                      <path d="M80 299.3V256H12v-54.7h68v-43.2c0-67.6 41.2-104.4 101.4-104.4 28.8 0 53.6 2.1 60.8 3v70.5h-41.7c-32.8 0-39.2 15.6-39.2 38.5v50.5h78.1L229 256h-68v185.3c-23.7 4.1-48 4.1-71.7 0z"/>
                    </svg>
                  ),
                  color: "#1877f2"
                },
                {
                  href: "https://www.instagram.com/engitechexpo_/",
                  svg: (
                    <svg width="14" height="14" viewBox="0 0 448 512" fill="white">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7 0-41.1 33.5-74.7 74.7-74.7 41.1 0 74.7 33.5 74.7 74.7 0 41.1-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                    </svg>
                  ),
                  color: "#d9317a"
                },
                {
                  href: "https://www.youtube.com/@EngitechExpo",
                  svg: (
                    <svg width="14" height="14" viewBox="0 0 576 512" fill="white">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597C16 166.521 16 256 16 256s0 89.479 10.345 131.917c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-12.586c23.497-6.321 42.003-24.171 48.284-47.821C560 345.479 560 256 560 256s0-89.479-10.345-131.917zM218.257 325.268V186.732L348.86 256l-130.603 69.268z"/>
                    </svg>
                  ),
                  color: "#ff0000"
                },
                {
                  href: "https://www.linkedin.com/company/engitechexpo/",
                  svg: (
                    <svg width="14" height="14" viewBox="0 0 448 512" fill="white">
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                    </svg>
                  ),
                  color: "#0a66c2"
                },
              ].map((soc, index) => (
                <a
                  key={index}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  style={{ '--social-bg': soc.color }}
                >
                  {soc.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-attribution">
        © 2026 ENGITECH. Designed & Developed By{" "}
        <a
          href="https://fuertedevelopers.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-attribution-link"
        >
          Fuerte Developers.
        </a>
      </div>
    </footer>
  );
}

export default function Layout({ children, pageCss = [], bodyClass = '' }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.className = bodyClass ||
      'wp-singular page-template page-template-elementor_header_footer page wp-custom-logo wp-theme-industrie elementor-default elementor-template-full-width elementor-kit-23 elementor-default';

    pageCss.forEach(({ id, href }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = id;
        link.href = process.env.PUBLIC_URL + href;
        document.head.appendChild(link);
      }
    });

    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      const $ = window.jQuery;
      if (!$) return;

      try {
        if ($.fn.owlCarousel) {
          $('.owl-carousel').each(function () {
            if (!$(this).hasClass('owl-loaded')) {
              const items = parseInt($(this).data('items')) || 3;
              const loop = $(this).data('loop') !== false;
              const dots = $(this).data('dots') !== false;
              const nav = $(this).data('nav') !== false;
              $(this).owlCarousel({
                loop, dots, nav, margin: 10,
                responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items } }
              });
            }
          });
        }
      } catch (e) { console.warn('Owl:', e); }

      try {
        if ($.fn.slick) {
          $('.slick-slider:not(.slick-initialized)').slick({ dots: true, infinite: true, autoplay: true });
        }
      } catch (e) { }

      try {
        if ($.fn.magnificPopup) {
          $('.popup-video, .mfp-iframe, .video-popup').magnificPopup({ type: 'iframe', mainClass: 'mfp-fade' });
          $('.popup-image, .mfp-image, .image-popup').magnificPopup({ type: 'image' });
        }
      } catch (e) { }

      try {
        if (window.Odometer) {
          $('.odometer').each(function () {
            const val = $(this).data('count') || $(this).attr('data-count') || 0;
            new window.Odometer({ el: this, value: 0 });
            setTimeout(() => { $(this).html(val); }, 500);
          });
        }
      } catch (e) { }

      try {
        if (window.Swiper) {
          document.querySelectorAll('.swiper:not(.swiper-initialized)').forEach(el => {
            new window.Swiper(el, {
              loop: true,
              autoplay: { delay: 3000, disableOnInteraction: false },
              pagination: { el: '.swiper-pagination', clickable: true },
              navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            });
          });
        }
      } catch (e) { }

      try {
        if ($.fn.isotope && $.fn.imagesLoaded) {
          const $grid = $('.portfolio-items, .isotope-grid, .rs-portfolio');
          $grid.imagesLoaded(function () {
            $grid.isotope({ itemSelector: '.portfolio-item, .grid-item', layoutMode: 'fitRows' });
          });
          $('.portfolio-filter a, .filter-btn').on('click', function () {
            const filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
          });
        }
      } catch (e) { }

      try {
        if ($.fn.waypoint) {
          $('.counter-number, .rs-count').waypoint(function () {
            $(this.element).each(function () {
              const target = parseInt($(this).data('to') || $(this).text());
              $(this).prop('Counter', 0).animate({ Counter: target }, {
                duration: 2000,
                step: function (now) { $(this).text(Math.ceil(now)); }
              });
            });
          }, { offset: '80%', triggerOnce: true });
        }
      } catch (e) { }

      try {
        $('#pre-load, .rs-loader, .preloader').fadeOut(500);
      } catch (e) { }

    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const ring = document.getElementById('cursor-ball');
    if (!ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="page-transition">
      <div id="page" className="hfeed site">
        <Navbar pathname={pathname} />

        {children}

        <Footer pathname={pathname} />
      </div>

      <div id="rs-mouse">
        <div id="cursor-ball" />
      </div>
    </div>
  );
}
