const WHATSAPP_URL = 'https://wa.me/966583816171';

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
