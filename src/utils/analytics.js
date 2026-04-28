export const initGA = () => {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-DN6WBGCPJX";

  const script2 = document.createElement("script");
  script2.innerHTML = `     window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DN6WBGCPJX');
  `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
};
