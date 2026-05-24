import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/css/footerstyle.css';

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Exhibitors", href: "/exhibitors" },
  { label: "Visitors", href: "/visitors" },
  { label: "Stall Booking", href: "/stall-booking" },
  { label: "Sponsors & Partners", href: "/sponsors-partners" },
  { label: "Media & Gallery", href: "/media-gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

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

const NAV_ITEMS = [
  { path: '/', label: 'Home', id: '31226' },
  { path: '/about', label: 'About us', id: '31015' },
  { path: '/exhibitors', label: 'Exhibitors', id: '31017' },
  { path: '/visitors', label: 'Visitors', id: '31018' },
  { path: '/stall-booking', label: 'Stall Booking', id: '31064' },
  { path: '/sponsors-partners', label: 'Sponsors &amp; Partners', id: '31088' },
  { path: '/media-gallery', label: 'Media &amp; Gallery', id: '31095' },
  { path: '/faqs', label: 'FAQs', id: '31096' },
  { path: '/blog', label: 'Blog', id: '29496' },
  { path: '/contact', label: 'Contact Us', id: '29498' },
];

function isActive(itemPath, pathname) {
  if (itemPath === '/') return pathname === '/';
  return pathname === itemPath || pathname.startsWith(itemPath + '/');
}

function buildMobileMenu(pathname) {
  return NAV_ITEMS.map(item => {
    const active = isActive(item.path, pathname);
    const cls = active
      ? `menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item current_page_item menu-item-${item.id}`
      : `menu-item menu-item-type-post_type menu-item-object-page menu-item-${item.id}`;
    return `<li id="menu-item-${item.id}" class="${cls}"><a href="${item.path}"${active ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
  }).join('\n');
}

function buildDesktopMenu(pathname) {
  return NAV_ITEMS.map(item => {
    const active = isActive(item.path, pathname);
    const cls = active
      ? `menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item current_page_item parent hfe-creative-menu`
      : `menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu`;
    return `<li id="menu-item-${item.id}" class="${cls}"><a href="${item.path}" class="hfe-menu-item">${item.label}<em class="rs__menu_sp_dyc"><i class="ri-arrow-right-line"></i></em></a></li>`;
  }).join('\n');
}

function buildFooterMenu(pathname) {
  return NAV_ITEMS.map(item => {
    const active = isActive(item.path, pathname);
    const cls = active
      ? `menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item current_page_item parent hfe-creative-menu`
      : `menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu`;
    return `<li id="menu-item-f-${item.id}" class="${cls}"><a href="${item.path}" class="hfe-menu-item">${item.label}<em class="rs__menu_sp_dyc"><i class="ri-arrow-right-line"></i></em></a></li>`;
  }).join('\n');
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
        $(window).off('scroll.sticky').on('scroll.sticky', function () {
          if ($(this).scrollTop() > 100) {
            $('header, .rs-header, .menu-sticky').addClass('sticky');
          } else {
            $('header, .rs-header, .menu-sticky').removeClass('sticky');
          }
        });
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

      // Nav expander (offcanvas)
      try {
        $('.nav-expander').off('click.offcanvas').on('click.offcanvas', function () {
          $('body').addClass('nav-expanded');
          $('.right_menu_togle').addClass('menu-toggle-open');
          $('.rsoffwrap').addClass('rsoffwrap-open');
        });
        $('.rsoffwrap, .rsoffwrap-close').off('click.offcanvas').on('click.offcanvas', function () {
          $('body').removeClass('nav-expanded');
          $('.right_menu_togle').removeClass('menu-toggle-open');
          $('.rsoffwrap').removeClass('rsoffwrap-open');
        });
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

  const mobileMenu = buildMobileMenu(pathname);
  const desktopMenu = buildDesktopMenu(pathname);
  const footerMenu = buildFooterMenu(pathname);

  const offcanvasHtml = `
<div class="rsoffwrap"></div>
<nav class="right_menu_togle">
  <div class="rsoffwrap-close"><i class="ri-close-line"></i></div>
  <nav class="nav navbar">
    <div class="navbar-menu">
      <div class="menu-main-menu-container">
        <ul id="mobile_menu_rstheme" class="menu rs_mobile_menu">
          ${mobileMenu}
        </ul>
      </div>
    </div>
  </nav>
</nav>`;

  const headerHtml = `
<div class="header-inner">
  <div data-elementor-type="wp-post" data-elementor-id="20407" class="elementor elementor-20407">
    <header class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-a40512c e-con-full e-flex e-con e-parent e-lazyloaded" data-id="a40512c" data-element_type="container" data-e-type="container">
      <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-4d7d6b1 e-con-full rs-full-responsive rs--mobile-hides rs--mobile-hides-header2 elementor-hidden-mobile e-flex e-con e-child" data-id="4d7d6b1" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-916cfd1 e-con-full e-flex e-con e-child" data-id="916cfd1" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div class="elementor-element elementor-element-56b81d1 elementor-widget elementor-widget-image" data-id="56b81d1" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
            <a href="/"><img fetchpriority="high" width="640" height="228" src="/images/engitech-2-1-768x274-1.png" class="attachment-large size-large wp-image-29638" alt="Engitech Expo"></a>
          </div>
        </div>
        <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-0a0cb0b e-con-full e-flex e-con e-child" data-id="0a0cb0b" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-21bb47d e-con-full e-flex e-con e-child" data-id="21bb47d" data-element_type="container" data-e-type="container">
            <div class="elementor-element elementor-element-dfc4242 elementor-hidden-tablet elementor-hidden-mobile hfe-nav-menu__breakpoint-none elementor-widget-laptop__width-inherit hfe-nav-menu__align-left hfe-submenu-icon-arrow hfe-submenu-animation-none hfe-link-redirect-child elementor-widget elementor-widget-navigation-menu" data-id="dfc4242" data-element_type="widget" data-e-type="widget" data-widget_type="navigation-menu.default">
              <div class="elementor-widget-container">
                <div class="hfe-nav-menu hfe-layout-horizontal normal hfe-nav-menu-layout mega_columns3 horizontal hfe-pointer__none" data-layout="horizontal">
                  <div class="hfe-nav-menu__toggle elementor-clickable" aria-haspopup="true" aria-expanded="false">
                    <div class="hfe-nav-menu-icon"></div>
                  </div>
                  <nav class="hfe-nav-menu__layout-horizontal hfe-nav-menu__submenu-arrow no-separator border-tops no-circle arrow rs-icon-dis" data-toggle-icon="" data-close-icon="" data-full-width="">
                    <ul id="menu-1-dfc4242" class="hfe-nav-menu">${desktopMenu}</ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-65ff9aa e-con-full e-flex e-con e-child" data-id="65ff9aa" data-element_type="container" data-e-type="container">
            <div class="elementor-element elementor-element-2bf8d67 elementor-widget elementor-widget-rs-button" data-id="2bf8d67" data-element_type="widget" data-e-type="widget" data-widget_type="rs-button.default">
              <div class="elementor-widget-container">
                <div class="rs-button style1">
                  <a class="rs-btn" href="/Ahmedabad-2026-Rajkot-2027-Vadodara-2028-12-1.pdf" target="_blank">
                    <span>Download Brochure <em><svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 5.66249 0.273604 5.38889 0.611111 5.38889L15.0246 5.38889L11.179 1.54323C10.9403 1.30458 10.9403 0.917645 11.179 0.678991C11.4176 0.440337 11.8046 0.440337 12.0432 0.678991L16.9321 5.56788C17.1708 5.80653 17.1708 6.19347 16.9321 6.43212L12.0432 11.321C11.8046 11.5597 11.4176 11.5597 11.179 11.321C10.9403 11.0824 10.9403 10.6954 11.179 10.4568L15.0246 6.61111L0.611111 6.61111C0.273604 6.61111 0 6.33751 0 6Z" fill="white"></path></svg></em></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="elementor-element elementor-element-e6809d7 elementor-hidden-desktop elementor-hidden-laptop elementor-widget elementor-widget-rsoffcanvas" data-id="e6809d7" data-element_type="widget" data-e-type="widget" data-widget_type="rsoffcanvas.default">
              <div class="elementor-widget-container">
                <div class="rs-offcanvas-area">
                  <ul><li class="nav-link pr-20"><a class="nav-expander"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M8.55566 11H1.55566C1.29045 11 1.03609 11.1054 0.848557 11.2929C0.661021 11.4804 0.555664 11.7348 0.555664 12V19C0.555664 19.2652 0.661021 19.5196 0.848557 19.7071C1.03609 19.8946 1.29045 20 1.55566 20H8.55566C8.82088 20 9.07523 19.8946 9.26277 19.7071C9.45031 19.5196 9.55566 19.2652 9.55566 19V12C9.55566 11.7348 9.45031 11.4804 9.26277 11.2929C9.07523 11.1054 8.82088 11 8.55566 11ZM7.55566 18H2.55566V13H7.55566V18ZM19.5557 0H12.5557C12.2904 0 12.0361 0.105357 11.8486 0.292893C11.661 0.48043 11.5557 0.734784 11.5557 1V8C11.5557 8.26522 11.661 8.51957 11.8486 8.70711C12.0361 8.89464 12.2904 9 12.5557 9H19.5557C19.8209 9 20.0752 8.89464 20.2628 8.70711C20.4503 8.51957 20.5557 8.26522 20.5557 8V1C20.5557 0.734784 20.4503 0.48043 20.2628 0.292893C20.0752 0.105357 19.8209 0 19.5557 0ZM18.5557 7H13.5557V2H18.5557V7ZM19.5557 11H12.5557C12.2904 11 12.0361 11.1054 11.8486 11.2929C11.661 11.4804 11.5557 11.7348 11.5557 12V19C11.5557 19.2652 11.661 19.5196 11.8486 19.7071C12.0361 19.8946 12.2904 20 12.5557 20H19.5557C19.8209 20 20.0752 19.8946 20.2628 19.7071C20.4503 19.5196 20.5557 19.2652 20.5557 19V12C20.5557 11.7348 20.4503 11.4804 20.2628 11.2929C20.0752 11.1054 19.8209 11 19.5557 11ZM18.5557 18H13.5557V13H18.5557V18ZM8.55566 0H1.55566C1.29045 0 1.03609 0.105357 0.848557 0.292893C0.661021 0.48043 0.555664 0.734784 0.555664 1V8C0.555664 8.26522 0.661021 8.51957 0.848557 8.70711C1.03609 8.89464 1.29045 9 1.55566 9H8.55566C8.82088 9 9.07523 8.89464 9.26277 8.70711C9.45031 8.51957 9.55566 8.26522 9.55566 8V1C9.55566 0.734784 9.45031 0.48043 9.26277 0.292893C9.07523 0.105357 8.82088 0 8.55566 0ZM7.55566 7H2.55566V2H7.55566V7Z" fill="#616161"></path></svg></a></li></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile header row -->
      <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-377eaa9 e-con-full rs-full-responsive rs--mobile-hides rs--mobile-hides-header2 elementor-hidden-desktop elementor-hidden-laptop elementor-hidden-tablet e-flex e-con e-child" data-id="377eaa9" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div class="default no-position show_shadow rs-sticky-default elementor-element elementor-element-7390859 e-con-full e-flex e-con e-child" data-id="7390859" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div class="elementor-element elementor-element-2cadd42 elementor-widget elementor-widget-image" data-id="2cadd42" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
            <a href="/"><img fetchpriority="high" width="640" height="228" src="/images/engitech-2-1-768x274-1.png" class="attachment-large size-large wp-image-29638" alt="Engitech Expo"></a>
          </div>
          <div class="elementor-element elementor-element-85ff95f elementor-hidden-desktop elementor-hidden-laptop elementor-widget elementor-widget-rsoffcanvas" data-id="85ff95f" data-element_type="widget" data-e-type="widget" data-widget_type="rsoffcanvas.default">
            <div class="elementor-widget-container">
              <div class="rs-offcanvas-area">
                <ul><li class="nav-link pr-20"><a class="nav-expander"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M8.55566 11H1.55566C1.29045 11 1.03609 11.1054 0.848557 11.2929C0.661021 11.4804 0.555664 11.7348 0.555664 12V19C0.555664 19.2652 0.661021 19.5196 0.848557 19.7071C1.03609 19.8946 1.29045 20 1.55566 20H8.55566C8.82088 20 9.07523 19.8946 9.26277 19.7071C9.45031 19.5196 9.55566 19.2652 9.55566 19V12C9.55566 11.7348 9.45031 11.4804 9.26277 11.2929C9.07523 11.1054 8.82088 11 8.55566 11ZM7.55566 18H2.55566V13H7.55566V18ZM19.5557 0H12.5557C12.2904 0 12.0361 0.105357 11.8486 0.292893C11.661 0.48043 11.5557 0.734784 11.5557 1V8C11.5557 8.26522 11.661 8.51957 11.8486 8.70711C12.0361 8.89464 12.2904 9 12.5557 9H19.5557C19.8209 9 20.0752 8.89464 20.2628 8.70711C20.4503 8.51957 20.5557 8.26522 20.5557 8V1C20.5557 0.734784 20.4503 0.48043 20.2628 0.292893C20.0752 0.105357 19.8209 0 19.5557 0ZM18.5557 7H13.5557V2H18.5557V7ZM19.5557 11H12.5557C12.2904 11 12.0361 11.1054 11.8486 11.2929C11.661 11.4804 11.5557 11.7348 11.5557 12V19C11.5557 19.2652 11.661 19.5196 11.8486 19.7071C12.0361 19.8946 12.2904 20 12.5557 20H19.5557C19.8209 20 20.0752 19.8946 20.2628 19.7071C20.4503 19.5196 20.5557 19.2652 20.5557 19V12C20.5557 11.7348 20.4503 11.4804 20.2628 11.2929C20.0752 11.1054 19.8209 11 19.5557 11ZM18.5557 18H13.5557V13H18.5557V18ZM8.55566 0H1.55566C1.29045 0 1.03609 0.105357 0.848557 0.292893C0.661021 0.48043 0.555664 0.734784 0.555664 1V8C0.555664 8.26522 0.661021 8.51957 0.848557 8.70711C1.03609 8.89464 1.29045 9 1.55566 9H8.55566C8.82088 9 9.07523 8.89464 9.26277 8.70711C9.45031 8.51957 9.55566 8.26522 9.55566 8V1C9.55566 0.734784 9.45031 0.48043 9.26277 0.292893C9.07523 0.105357 8.82088 0 8.55566 0ZM7.55566 7H2.55566V2H7.55566V7Z" fill="#616161"></path></svg></a></li></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>
<div id="rs-theme-toggle" class="rs_ld_btn" style="opacity: 0; display: none;">
  <span class="d-block-light"><i class="ri-sun-line"></i></span>
  <span class="d-block-dark"><i class="ri-moon-line"></i></span>
</div>`;

  return (
    <div className="page-transition">
      <div id="pre-load" style={{ display: 'none' }}>
        <div id="loader" className="loader">
          <div className="loader-container">
            <div className="loader-icon">
              <img src="/images/engitech-2-1-768x274-1.png" alt="Engitech Expo" />
            </div>
          </div>
        </div>
      </div>

      <div className="rs-offcanvas-area" dangerouslySetInnerHTML={{ __html: offcanvasHtml }} />

      <div id="page" className="hfeed site">
        <header id="rs-header" className="single-header" dangerouslySetInnerHTML={{ __html: headerHtml }} />

        {children}

        <Footer pathname={pathname} />
      </div>

      <div id="rs-mouse">
        <div id="cursor-ball" />
      </div>
    </div>
  );
}
