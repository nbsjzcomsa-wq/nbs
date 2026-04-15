import HammerIcon from './HammerIcon';
import XIcon from './XIcon';

const MAP_SRC = "https://maps.google.com/maps?q=%D9%85%D8%B3%D8%A7%D8%AD%D8%A9+%D8%B9%D9%85%D9%84+%D9%85%D8%B4%D8%AA%D8%B1%D9%83%D8%A9+%D9%83%D9%8F%D9%86%D8%8C+8478+%D8%B7%D8%B1%D9%8A%D9%82+%D8%A7%D9%84%D9%85%D9%84%D9%83+%D8%B3%D9%84%D9%85%D8%A7%D9%86+%D8%A8%D9%86+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%D8%8C+%D8%AD%D9%8A+%D8%A7%D9%84%D9%86%D8%B1%D8%AC%D8%B3%D8%8C+3369%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+13327&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function Contact() {
  return (
    <section className="contact-one contact-one--simple" id="contact">
      <div className="contact-one__map contact-one__map--fullbleed google-map google-map__contact wow fadeInUp" data-wow-delay="200ms">
        <iframe
          className="map__contact"
          title="موقع نبراس الجزيرة"
          src={MAP_SRC}
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="container">
        <div className="contact-one__wrapper">
          <div className="row align-items-center">
            <div className="col-xl-6 wow fadeInUp" data-wow-delay="00ms">
              <div className="contact-one__panel">
                <div className="sec-title text-right">
                  <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
                    <div><HammerIcon /></div>
                    تواصل معنا
                  </div>
                  <h2 className="sec-title__title">يسعدنا استقبال <span>استفساراتكم</span> في أي وقت</h2>
                </div>
                <div className="contact-one__content">
                  <p className="contact-one__text">
                    يمكنكم التواصل معنا عبر الهاتف أو البريد الإلكتروني، كما يمكنكم زيارة مقرنا في الرياض للاطلاع على خدماتنا القانونية عن قرب.
                  </p>
                  <ul className="list-unstyled contact-one__info">
                    <li className="contact-one__info__item">
                      <div className="contact-one__info__icon">
                        <i className="icon-telephone-call-1"></i>
                        <span className="contact-one__info__icon__zoom">
                          <i className="icon-telephone-call-1"></i>
                        </span>
                      </div>
                      <div className="contact-one__info__content">
                        <p className="contact-one__info__text">
                          <a href="tel:+966583816171">0583816171</a>
                        </p>
                      </div>
                    </li>
                    <li className="contact-one__info__item">
                      <div className="contact-one__info__icon">
                        <i className="icon-mail"></i>
                        <span className="contact-one__info__icon__zoom">
                          <i className="icon-mail"></i>
                        </span>
                      </div>
                      <div className="contact-one__info__content">
                        <p className="contact-one__info__text">
                          <a href="mailto:info@nibrasaljazira.com.sa">info@nibrasaljazira.com.sa</a>
                        </p>
                      </div>
                    </li>
                    <li className="contact-one__info__item contact-one__info__item--social">
                      <div className="contact-one__info__icon">
                        <i className="fas fa-share-alt"></i>
                        <span className="contact-one__info__icon__zoom">
                          <i className="fas fa-share-alt"></i>
                        </span>
                      </div>
                      <div className="contact-one__info__content">
                        <div className="contact-one__social-links">
                          <a href="https://www.tiktok.com/@law.nbr" aria-label="تيك توك">
                            <i className="fab fa-tiktok"></i>
                            <span>law.nbr</span>
                          </a>
                          <a href="https://www.instagram.com/nbrsljzyrllmhm" aria-label="إنستقرام">
                            <i className="fab fa-instagram"></i>
                            <span>nbrsljzyrllmhm</span>
                          </a>
                          <a href="https://x.com/nbras966" aria-label="منصة X">
                            <XIcon className="contact-one__social-icon-svg" />
                            <span>nbras966</span>
                          </a>
                          <a href="https://www.snapchat.com/add/nbras966" aria-label="سناب شات">
                            <i className="fab fa-snapchat-ghost"></i>
                            <span>nbras966</span>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="contact-one__info__item">
                      <div className="contact-one__info__icon">
                        <i className="icon-map-pin"></i>
                        <span className="contact-one__info__icon__zoom">
                          <i className="icon-map-pin"></i>
                        </span>
                      </div>
                      <div className="contact-one__info__content">
                        <p className="contact-one__info__text">
                          مساحة عمل مشتركة كُن، 8478 طريق الملك سلمان بن عبدالعزيز، حي النرجس، الرياض 13327
                        </p>
                      </div>
                    </li>
                    <li className="contact-one__info__item contact-one__info__item--map">
                      <div className="contact-one__info__icon">
                        <i className="icon-map-pin"></i>
                        <span className="contact-one__info__icon__zoom">
                          <i className="icon-map-pin"></i>
                        </span>
                      </div>
                      <div className="contact-one__info__content">
                        <div className="contact-one__info__map">
                          <iframe
                            title="خريطة موقع نبراس الجزيرة"
                            src={MAP_SRC}
                            loading="lazy"
                            allowFullScreen=""
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
