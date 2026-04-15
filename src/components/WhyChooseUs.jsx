import HammerIcon from './HammerIcon';

export default function WhyChooseUs() {
  return (
    <section className="why-choose-four" id="whyus">
      <div className="why-choose-four__bg"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 wow fadeInUp" data-wow-delay="00ms">
            <div className="why-choose-four__content">
              <div className="sec-title text-right">
                <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
                  <div><HammerIcon /></div>
                  لماذا تختارنا
                </div>
                <h2 className="sec-title__title">لماذا تختار <br /><span>نبراس الجزيرة؟</span></h2>
              </div>
              <p className="why-choose-four__content__text">
                تمتلك شركتنا خبرة عميقة في مجال المحاماة والاستشارات مما يجعلنا قادرين على التعامل مع تحديات متنوعة بكفاءة وفعالية.
              </p>
              <div className="why-choose-four__list">
                <div className="why-choose-four__item">
                  <div className="why-choose-four__item__top">
                    <div className="why-choose-four__item__icon">
                      <i className="icon-podium"></i>
                    </div>
                    <h3 className="why-choose-four__item__title">خدمة عملاء <br /> استثنائية</h3>
                  </div>
                  <p className="why-choose-four__item__text">
                    نحن ملتزمون بتقديم خدمة عملاء استثنائية، حيث نضع احتياجاتهم ومصالحهم في قلب عملنا
                  </p>
                </div>
                <div className="why-choose-four__item">
                  <div className="why-choose-four__item__top">
                    <div className="why-choose-four__item__icon">
                      <i className="icon-collaboration"></i>
                    </div>
                    <h3 className="why-choose-four__item__title">الابتكار <br /> والتطوير</h3>
                  </div>
                  <p className="why-choose-four__item__text">
                    نحرص على الابتكار والتطوير المستمر لتلبية المتطلبات القانونية وتقديم الحلول الأفضل لعملائنا
                  </p>
                </div>
              </div>
              <a href="#contact" className="procounsel-btn">
                <i>تواصل معنا</i>
                <span>تواصل معنا</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
