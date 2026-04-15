export default function HeroSlider() {
  return (
    <section className="main-slider-five" id="home">
      <div className="main-slider-five__item main-slider-five__item--static">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="main-slider-five__content">
                <h1 className="main-slider-five__title">
                  &ldquo;علينا أن نسعى جاهدين للوصول إلى الشمولية والعدالة لتحقيق أكبر قدر من الرخاء&rdquo;
                </h1>
                <p className="main-slider-five__text">
                  ولي العهد ورئيس مجلس الوزراء <br />
                  سمو الأمير محمد بن سلمان
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="main-slider-five__img">
                <img
                  src="/assets/images/resources/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية-الرياض.jpg"
                  alt="نبراس الجزيرة للمحاماة والاستشارات القانونية"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
