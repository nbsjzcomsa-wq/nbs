const GOALS = [
  'السعي الدؤوب لتقديم أفضل المعالجات القانونية للعملاء.',
  'المحافظة على الاحترافية والمهنية لأعضاء فريق العمل من المحامين والمستشارين القانونيين.',
  'توفير بيئة إيجابية ومحفزة لفريق العمل، سعياً لتحقيق أعلى مستويات الأداء والجودة في مخرجات العمل.',
  'تعزيز الوعي القانوني في المجتمع.',
];

export default function Goals() {
  return (
    <section className="testimonials-five mt-80" id="goals">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 mx-auto wow fadeInUp" data-wow-delay="100ms">
            <div className="sec-title text-right">
              <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
                أهدافنا
              </div>
              <h2 className="sec-title__title">نسعى لتحقيق <br /><span>أعلى مستويات الأداء</span></h2>
            </div>
            <div className="goals-grid row gutter-y-30">
              {GOALS.map((goal, index) => (
                <div key={index} className="col-md-6">
                  <div className="testimonials-card-five wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="000ms">
                    <div className="testimonials-card-five__top">
                      <div className="testimonials-card-five__quote">
                        <i className="icon-quote"></i>
                        <i className="icon-quote"></i>
                      </div>
                      <div className="testimonials-card-five__text">
                        {goal}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
