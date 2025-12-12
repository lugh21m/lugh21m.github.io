Tourist Visibility Boost — README
================================

This folder contains the V1 landing page for the `Tourist Visibility Boost` product.

What this includes
- `index.html` — the EN landing page
- `assets/` — placeholder SVGs and photos used by the page

Quick customization
- Replace the placeholder images in `assets/` with real screenshots and photos.
- Update the WhatsApp number + LINE link by editing the `window.TOURIST_BOOST_CONTACTS` object inside the `<head>` of `index.html`:

  <script>
    window.TOURIST_BOOST_CONTACTS = {
      whatsapp: '00000000',                         // local number *without* +
      whatsappHref: 'https://wa.me/00000000',      // or full wa.me path with number
      lineHref: 'https://line.me/ti/p/2Akbahv6V2'  // link to LINE chat
    };
  </script>

- The page will auto-fill any `.whatsapp-link` anchors and `.line-link` anchors from that object on page load.

Accessibility & UX
- Images are included with `alt` attributes — replace them with meaningful descriptions if you add new photos.
- CTAs open in a new tab for external apps; modify if you prefer same-tab behavior.

Suggested commit & deploy
- Check changes locally and confirm images, test CTAs:

  git add tourist-boost/
  git commit -m "tourist-boost: add v1 landing page, centralize contacts and mobile CTAs"
  git push origin main

If you want, I can: replace the placeholder assets, update the WhatsApp number for you, or create a short screenshot preview for the page.
