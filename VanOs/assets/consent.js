(function(){
  const STORAGE_KEY = "vanos-consent";
  const analyticsId = document.currentScript?.dataset.gtagId || "";

  function createBanner(){
    const banner = document.createElement("div");
    banner.setAttribute("role","dialog");
    banner.setAttribute("aria-live","polite");
    banner.setAttribute("aria-label","Cookie- und Tracking-Auswahl");
    banner.style.position="fixed";
    banner.style.bottom="18px";
    banner.style.right="18px";
    banner.style.maxWidth="360px";
    banner.style.padding="14px 16px";
    banner.style.borderRadius="14px";
    banner.style.background="#0c1224";
    banner.style.color="#fff";
    banner.style.boxShadow="0 14px 30px rgba(0,0,0,0.32)";
    banner.style.zIndex="1000";

    banner.innerHTML = `
      <div style="font-weight:700;margin-bottom:6px">Analytics laden?</div>
      <div style="font-size:14px;line-height:1.5;opacity:0.85;margin-bottom:12px">
        Wir nutzen anonymisierte Nutzungsdaten (GA4). Du kannst ablehnen – die Seite bleibt nutzbar.
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button type="button" data-choice="accept" style="flex:1;padding:10px 12px;border-radius:10px;border:none;background:#f4b400;color:#0c1224;font-weight:700;cursor:pointer">Zustimmen</button>
        <button type="button" data-choice="decline" style="flex:1;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.24);background:transparent;color:#fff;font-weight:700;cursor:pointer">Ablehnen</button>
      </div>
    `;
    banner.addEventListener("click", (ev)=>{
      const choice = ev.target?.dataset?.choice;
      if(!choice) return;
      const allowed = choice==="accept";
      window.localStorage.setItem(STORAGE_KEY, allowed ? "granted" : "denied");
      banner.remove();
      if(allowed) loadAnalytics();
    });
    document.body.appendChild(banner);
  }

  function loadAnalytics(){
    if(!analyticsId) return;
    if(document.getElementById("gtag-script")) return;
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.id = "gtag-script";
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', analyticsId, {anonymize_ip:true});
  }

  function init(){
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if(stored==="granted"){
      loadAnalytics();
      return;
    }
    if(stored==="denied"){
      return;
    }
    if(document.readyState==="loading"){
      document.addEventListener("DOMContentLoaded", createBanner);
    }else{
      createBanner();
    }
  }
  init();
})();
