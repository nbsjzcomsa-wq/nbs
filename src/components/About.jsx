import HammerIcon from './HammerIcon';

export default function About() {
  return (
    <section className="about-six" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="100ms">
            <div className="about-six__left">
              <div className="about-six__img">
                <img src="/assets/images/resources/من-نحن-نبراس-الجزيرة.jpg" alt="من نحن في نبراس الجزيرة" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="200ms">
            <div className="about-six__content">
              <div className="sec-title text-right">
                <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
                  <div><HammerIcon /></div>
                  من نحن
                </div>
                <h2 className="sec-title__title">نبراس الجزيرة للمحاماة <span>والاستشارات القانونية</span></h2>
              </div>
              <p className="about-six__text">
                نحن شركة نبراس الجزيرة للمحاماة والاستشارات القانونية لدينا خبرة راسخة في مجالنا ونهتم بتوفير أعلى مستويات الخدمة لعملائنا، يمتاز كادرنا بعناية في الاختيار حيث يجمع بين مجموعة من القانونيين المتميزين ذوي الخبرة ونسعى بجدية لتقديم خدمات عالية الجودة والاعتمادية.
              </p>
              <ul className="list-unstyled about-six__list">
                <li className="about-six__item">
                  <div className="about-six__item__icon">
                    <i className="icon-idea-1"></i>
                  </div>
                  رؤيتنا: <br />
                  أن تكون نبراس الجزيرة أحد أفضل الوجهات القانونية في المملكة العربية السعودية والخليج
                </li>
                <li className="about-six__item">
                  <div className="about-six__item__icon">
                    <i className="icon-address-book-1"></i>
                  </div>
                  رسالتنا: <br />
                  تقديم الخدمات القانونية وفقاً لأفضل الممارسات المحلية والدولية
                </li>
              </ul>
              <div className="about-six__btns">
                <a href="#services" className="procounsel-btn">
                  <i>خدماتنا</i>
                  <span>خدماتنا</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
