import { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onLoad = () => setVisible(false);

    if (document.readyState === 'complete') {
      setVisible(false);
    } else {
      window.addEventListener('load', onLoad);
    }

    const fallback = setTimeout(() => setVisible(false), 3000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader">
      <div className="preloader__image">
        <img
          src="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png"
          alt="جاري التحميل..."
          width="60"
        />
      </div>
    </div>
  );
}
