import { useState, useEffect } from 'react';
import XIcon from './XIcon';

const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'من نحن' },
  { id: 'whyus', label: 'لماذا تختارنا' },
  { id: 'goals', label: 'أهدافنا' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'values', label: 'قيمنا' },
  { id: 'contact', label: 'تواصل معنا' },
];

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 130);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('locked', mobileOpen);
  }, [mobileOpen]);

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <header className={`main-header main-header--five sticky-header sticky-header--one-page${sticky ? ' active' : ''}`}>
        <div className="main-header__inner">
          <div className="main-header__logo">
            <a href="#home">
              <img src="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png" alt="نبراس الجزيرة للمحاماة والاستشارات القانونية" width="160" />
            </a>
          </div>
          <div className="main-header__center">
            <div className="topbar-one">
              <div className="topbar-one__inner">
                <ul className="list-unstyled topbar-one__info">
                  <li className="topbar-one__info__item">
                    <i className="fas fa-map-marker-alt topbar-one__info__icon"></i>
                    الرياض - حي النرجس - طريق الملك سلمان بن عبدالعزيز
                  </li>
                  <li className="topbar-one__info__item">
                    <i className="fas fa-envelope topbar-one__info__icon"></i>
                    <a href="mailto:info@nibrasaljazira.com.sa">info@nibrasaljazira.com.sa</a>
                  </li>
                </ul>
                <div className="topbar-one__right">
                  <p className="topbar-one__text"><i className="icon-clock topbar-one__info__icon"></i>متاح على مدار الساعة</p>
                </div>
                <div className="main-header__right__social">
                  <a href="https://www.tiktok.com/@law.nbr" aria-label="تيك توك">
                    <i className="fab fa-tiktok"></i>
                    <span className="sr-only">TikTok</span>
                  </a>
                  <a href="https://www.instagram.com/nbrsljzyrllmhm" aria-label="إنستقرام">
                    <i className="fab fa-instagram"></i>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://x.com/nbras966" aria-label="منصة X">
                    <XIcon className="main-header__social-icon-svg" />
                    <span className="sr-only">X</span>
                  </a>
                  <a href="https://www.snapchat.com/add/nibrasjazeera" aria-label="سناب شات">
                    <i className="fab fa-snapchat-ghost"></i>
                    <span className="sr-only">Snapchat</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="main-header__center__bottom">
              <nav className="main-header__nav main-menu" aria-label="التنقل الرئيسي">
                <ul className="main-menu__list one-page-scroll-menu">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id} className="scrollToLink">
                      <a href={`#${item.id}`}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="main-header__right">
                <button className="mobile-nav__btn mobile-nav__toggler" type="button" aria-label="فتح القائمة" onClick={() => setMobileOpen(true)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="main-header__info">
                  <div className="main-header__info__icon">
                    <i className="icon-phone-1"></i>
                    <span className="main-header__info__icon__zoom">
                      <i className="icon-phone-1"></i>
                    </span>
                  </div>
                  <div>
                    <span className="main-header__info__text">اتصل بنا</span>
                    <a href="tel:+966583816171">0583816171</a>
                  </div>
                </div>
                <div className="main-header__btn">
                  <a href="#contact" className="procounsel-btn">
                    <i>طلب استشارة</i><span>طلب استشارة</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-nav__wrapper${mobileOpen ? ' expanded' : ''}`}>
        <div className="mobile-nav__overlay mobile-nav__toggler" onClick={() => setMobileOpen(false)}></div>
        <div className="mobile-nav__content">
          <button className="mobile-nav__close mobile-nav__toggler" type="button" aria-label="إغلاق القائمة" onClick={() => setMobileOpen(false)}>
            <i className="fa fa-times"></i>
          </button>
          <div className="logo-box">
            <a href="#home" aria-label="نبراس الجزيرة للمحاماة والاستشارات القانونية">
              <img src="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png" width="155" alt="نبراس الجزيرة للمحاماة والاستشارات القانونية" loading="lazy" decoding="async" />
            </a>
          </div>
          <nav className="mobile-nav__container" aria-label="التنقل للجوال">
            <ul className="main-menu__list one-page-scroll-menu list-unstyled">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="scrollToLink">
                  <a href={`#${item.id}`} onClick={handleNavClick}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope"></i>
              <a href="mailto:info@nibrasaljazira.com.sa">info@nibrasaljazira.com.sa</a>
            </li>
            <li>
              <i className="fa fa-phone-alt"></i>
              <a href="tel:+966583816171">0583816171</a>
            </li>
          </ul>
          <div className="mobile-nav__social">
            <a href="https://www.tiktok.com/@law.nbr" aria-label="تيك توك">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://www.instagram.com/nbrsljzyrllmhm" aria-label="إنستقرام">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/nbras966" aria-label="منصة X">
              <XIcon className="main-header__social-icon-svg" />
            </a>
            <a href="https://www.snapchat.com/add/nbras966" aria-label="سناب شات">
              <i className="fab fa-snapchat-ghost"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
