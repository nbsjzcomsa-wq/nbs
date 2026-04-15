import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import About from './components/About';
import Services from './components/Services';
import Values from './components/Values';
import Goals from './components/Goals';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nibrasaljazira.com.sa/#organization",
      "name": "نبراس الجزيرة للمحاماة والاستشارات القانونية",
      "url": "https://nibrasaljazira.com.sa/",
      "logo": "https://nibrasaljazira.com.sa/android-chrome-512x512.png",
      "image": "https://nibrasaljazira.com.sa/android-chrome-512x512.png",
      "email": "info@nibrasaljazira.com.sa",
      "telephone": "+966583816171",
      "sameAs": [
        "https://www.tiktok.com/@law.nbr",
        "https://www.instagram.com/nbrsljzyrllmhm",
        "https://x.com/nbras966",
        "https://www.snapchat.com/add/nbras966",
        "https://www.snapchat.com/add/nibrasjazeera"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "مساحة عمل مشتركة كُن، 8478 طريق الملك سلمان بن عبدالعزيز، حي النرجس",
        "addressLocality": "الرياض",
        "postalCode": "13327",
        "addressCountry": "SA"
      }
    },
    {
      "@type": "LegalService",
      "@id": "https://nibrasaljazira.com.sa/#legalservice",
      "name": "نبراس الجزيرة للمحاماة والاستشارات القانونية",
      "url": "https://nibrasaljazira.com.sa/",
      "description": "نبراس الجزيرة للمحاماة والاستشارات القانونية تقدم خدمات قانونية عالية الجودة والاعتمادية تشمل تأسيس الشركات، الترافع والتمثيل، والاستشارات والدراسات.",
      "image": "https://nibrasaljazira.com.sa/android-chrome-512x512.png",
      "areaServed": ["الرياض", "المملكة العربية السعودية", "الخليج"],
      "telephone": "+966583816171",
      "email": "info@nibrasaljazira.com.sa",
      "availableLanguage": "ar",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "مساحة عمل مشتركة كُن، 8478 طريق الملك سلمان بن عبدالعزيز، حي النرجس",
        "addressLocality": "الرياض",
        "postalCode": "13327",
        "addressCountry": "SA"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "خدمات الشركة",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تأسيس الشركات" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "المصرفية والمالية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التجارة الالكترونية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الملكية الفكرية والصناعية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التعاملات المدنية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "قسمة التركات" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القانون الجنائي" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "المنازعات العمالية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "المنازعات الإدارية" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الاستشارات والدراسات" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الترافع والتمثيل" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التحكيم وتسوية المنازعات" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القطاع غير الربحي" } }
        ]
      }
    }
  ]
};

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>نبراس الجزيرة للمحاماة والاستشارات القانونية</title>
        <meta name="description" content="نبراس الجزيرة للمحاماة والاستشارات القانونية تقدم خدمات قانونية عالية الجودة والاعتمادية تشمل تأسيس الشركات، الترافع والتمثيل، والاستشارات والدراسات." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://nibrasaljazira.com.sa/" />
        <link rel="alternate" hrefLang="ar-SA" href="https://nibrasaljazira.com.sa/" />

        <meta property="og:locale" content="ar_SA" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="نبراس الجزيرة للمحاماة والاستشارات القانونية" />
        <meta property="og:description" content="نبراس الجزيرة للمحاماة والاستشارات القانونية تقدم خدمات قانونية عالية الجودة والاعتمادية تشمل تأسيس الشركات، الترافع والتمثيل، والاستشارات والدراسات." />
        <meta property="og:url" content="https://nibrasaljazira.com.sa/" />
        <meta property="og:site_name" content="نبراس الجزيرة للمحاماة والاستشارات القانونية" />
        <meta property="og:image" content="https://nibrasaljazira.com.sa/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="نبراس الجزيرة للمحاماة والاستشارات القانونية" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="نبراس الجزيرة للمحاماة والاستشارات القانونية" />
        <meta name="twitter:description" content="نبراس الجزيرة للمحاماة والاستشارات القانونية تقدم خدمات قانونية عالية الجودة والاعتمادية تشمل تأسيس الشركات، الترافع والتمثيل، والاستشارات والدراسات." />
        <meta name="twitter:image" content="https://nibrasaljazira.com.sa/android-chrome-512x512.png" />
        <meta name="twitter:image:alt" content="نبراس الجزيرة للمحاماة والاستشارات القانونية" />

        <meta name="theme-color" content="#324556" />

        <link rel="preload" as="image" href="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/assets/images/resources/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية-الرياض.jpg" fetchPriority="high" />

        <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>
      </Helmet>

      <Preloader />
      <div className="page-wrapper">
        <Header />
        <main id="main-content">
          <HeroSlider />
          <About />
          <WhyChooseUs />
          <Goals />
          <Services />
          <Values />
          <Contact />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </HelmetProvider>
  );
}
