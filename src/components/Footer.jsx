export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-footer__bg"></div>
      <div className="main-footer__top">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6 col-md-8 wow fadeInUp" data-wow-delay="00ms">
              <div className="footer-widget footer-widget--about footer-widget--minimal">
                <a href="#home" className="footer-widget__logo">
                  <img
                    src="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png"
                    width="160"
                    alt="نبراس الجزيرة للمحاماة والاستشارات القانونية"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-footer__bottom wow fadeInUp" data-wow-delay="00ms">
        <div className="container">
          <div className="main-footer__bottom__inner">
            <p className="main-footer__copyright">
              &copy; جميع الحقوق محفوظة {new Date().getFullYear()} نبراس الجزيرة للمحاماة والاستشارات القانونية.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
