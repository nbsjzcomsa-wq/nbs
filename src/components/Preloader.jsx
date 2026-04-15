import { useState, useEffect } from 'react';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9991,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#324556',
  transition: 'opacity 0.4s ease',
};

const imgStyle = {
  width: '60px',
  height: '60px',
  animation: 'spin 1.5s linear infinite',
};

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const hide = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 400);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
    }

    const fallback = setTimeout(hide, 3000);

    return () => {
      window.removeEventListener('load', hide);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{ ...overlayStyle, opacity: fading ? 0 : 1 }}>
      <style>{`@keyframes spin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }`}</style>
      <img
        src="/assets/images/favicons/android-chrome-192x192.png"
        alt="جاري التحميل..."
        style={imgStyle}
      />
    </div>
  );
}
