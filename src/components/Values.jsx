import HammerIcon from './HammerIcon';

const VALUES = [
  { icon: 'fas fa-user-shield', title: 'خصوصية العملاء', text: 'المحافظة على خصوصية العملاء وسرية بياناتهم', light: false },
  { icon: 'fas fa-award', title: 'الجودة والاحترافية', text: 'تقديم الخدمات وفقاً لأعلى معايير الجودة والاحترافية', light: true },
  { icon: 'fas fa-balance-scale', title: 'النزاهة والشفافية', text: 'النزاهة والشفافية في الخدمة المقدمة لعملائنا', light: false },
  { icon: 'fas fa-gavel', title: 'احترام الأنظمة', text: 'احترام الأنظمة والمبادئ الشرعية', light: true },
  { icon: 'fas fa-lightbulb', title: 'التطوير المستمر', text: 'التطوير والتحسين المستمر', light: false },
];

export default function Values() {
  return (
    <section className="case-study-six" id="values">
      <div className="container">
        <div className="case-study-six__header">
          <div className="sec-title text-right">
            <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
              <div><HammerIcon /></div>
              قيمنا
            </div>
            <h2 className="sec-title__title">القيم التي <span>نؤمن بها</span></h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row gutter-y-30">
          {VALUES.map((value, index) => (
            <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${index * 100}ms`}>
              <div className="service-five__item">
                <div className={`service-five__item__normal${value.light ? ' service-five__item__light' : ''}`}>
                  <div className="service-five__item__icon">
                    <i className={value.icon}></i>
                  </div>
                  <div className="service-five__item__content">
                    <h3 className="service-five__item__title">{value.title}</h3>
                    <p className="service-five__item__text">{value.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
