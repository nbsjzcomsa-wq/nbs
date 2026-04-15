const SERVICES = [
  {
    icon: 'icon-pillar',
    title: 'تأسيس الشركات',
    light: false,
    id: 'service-companies',
    tag: 'article',
    items: [
      'الكيانات التجارية', 'عمليات الحوكمة', 'اندماج واستحواذ الشركات',
      'التسوية الوقائية من الإفلاس', 'إعادة التنظيم المالي', 'تصفية الشركات',
      'الاستثمار الأجنبي', 'إعداد لوائح الشركات والمواثيق العائلية',
      'إعداد لوائح الجمعيات والمؤسسات', 'منازعات السوق المالية',
    ],
  },
  {
    icon: 'icon-payment',
    title: 'المصرفية والمالية',
    light: true,
    items: [
      'عمليات البنوك', 'المنازعات التأمينية', 'المنازعات التمويلية',
      'المنازعات الضريبية', 'المنازعات الزكوية', 'المنازعات الجمركية',
    ],
  },
  {
    icon: 'icon-ecommerce-law',
    title: 'التجارة الالكترونية',
    light: false,
    items: [
      'التعاملات التجارية', 'الوكالات التجارية', 'الامتياز التجاري',
      'الرهن التجاري', 'عقود المقاولات',
    ],
  },
  {
    icon: 'icon-advice-two',
    title: 'الملكية الفكرية والصناعية',
    light: true,
    items: ['الأسماء التجارية', 'العلامات التجارية', 'براءات الاختراع', 'حقوق المؤلف'],
  },
  {
    icon: 'icon-real-estate-law',
    title: 'التعاملات المدنية',
    light: false,
    items: [
      'المساهمات العقارية', 'قسمة وفرز العقارات المشتركة',
      'معالجة الصكوك العقارية وحجج الاستحكام', 'المنازعات العقارية',
      'العقود والتعاملات العقارية',
    ],
  },
  {
    icon: 'icon-family-law',
    title: 'قسمة التركات',
    light: true,
    items: ['حصر التركات', 'تصفية التركات', 'تمثيل التركات'],
  },
  {
    icon: 'icon-criminal-law',
    title: 'القانون الجنائي',
    light: false,
    items: ['تقديم الخدمات القانونية المتعلقة بالجنايات'],
  },
  {
    icon: 'icon-employment-law',
    title: 'المنازعات العمالية',
    light: true,
    items: ['منازعات الحقوق الوظيفية المدنية والعسكرية'],
  },
  {
    icon: 'icon-collaboration',
    title: 'المنازعات الإدارية',
    light: false,
    items: [
      'إلغاء القرارات الإدارية والتعويض عنها',
      'العقود الإدارية', 'نزع الملكية للمنفعة العامة',
    ],
  },
  {
    icon: 'icon-idea-1',
    title: 'الاستشارات والدراسات',
    light: true,
    id: 'service-consulting-studies',
    tag: 'article',
    items: [
      'إعداد لوائح وإجراءات وسياسات تنظيم العمل الداخلي',
      'تسوية المنازعات العمالية', 'إعداد الأنظمة واللوائح ومراجعتها',
      'إعداد السياسات والنماذج ومراجعتها', 'إعداد الأدلة الإجرائية ومراجعتها',
      'إعداد الدراسات الشرعية والقانونية',
    ],
  },
  {
    icon: 'icon-address-book-1',
    title: 'الترافع والتمثيل',
    light: false,
    id: 'service-litigation',
    tag: 'article',
    items: [
      'التمثيل والتقاضي أمام المحاكم واللجان شبه القضائية بكافة تخصصاتها',
      'التمثيل والترافع أمام هيئات التحكيم الدولية والمحلية',
      'تمثيل الموظفين الخاضعين لنظام الخدمة المدنية أمام الجهات الحكومية',
      'الحضور أمام النيابة العامة وهيئة الرقابة ومكافحة الفساد',
    ],
  },
  {
    icon: 'icon-quote',
    title: 'التحكيم وتسوية المنازعات',
    light: true,
    items: [
      'الفصل في منازعات التحكيم كمحكمين',
      'تقديم الوسائل البديلة لتسوية المنازعات كالوساطة والصلح والتوثيق',
      'صياغة ومراجعة اتفاقيات التحكيم',
    ],
  },
  {
    icon: 'icon-podium',
    title: 'القطاع غير الربحي',
    light: false,
    items: [
      'تأسيس الشركات غير الربحية', 'تأسيس الجمعيات التعاونية',
      'صياغة الأوقاف والوصايا وحوكمتها', 'تأسيس الأوقاف والإشراف القانوني عليها',
      'الإشراف على الاستثمار الوقفي ومصاريفه',
    ],
  },
];

function ServiceCard({ service, delay }) {
  const Wrapper = service.tag || 'div';
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${delay}ms`}>
      <Wrapper className="service-five__item" {...(service.id ? { id: service.id } : {})}>
        <div className={`service-five__item__normal${service.light ? ' service-five__item__light' : ''}`}>
          <div className="service-five__item__icon">
            <i className={service.icon}></i>
          </div>
          <div className="service-five__item__content">
            <h3 className="service-five__item__title">{service.title}</h3>
            <ul className="service-five__item__list list-unstyled">
              {service.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default function Services() {
  return (
    <section className="service-five" id="services">
      <div className="service-five__bg"></div>
      <div className="service-five__wrapper">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="sec-title text-right">
                <div className="sec-title__tagline-fast d-inline-flex align-items-center gap-2">
                  خدمات الشركة
                </div>
                <h2 className="sec-title__title">نقدم أفضل الخدمات <br /> <span>القانونية لعملائنا</span></h2>
              </div>
            </div>
          </div>
          <div className="row service-five__row">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} delay={index * 50} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
