# CamperVanOs Pages

## Routing
- `/VanOs/` – T5 Landing
- `/VanOs/products/` – Produktübersicht
- `/VanOs/about/` – Über
- `/VanOs/contact/` – Kontakt
- `/VanOs/404.html` – Fallback 404 (configure static host to use it)

## Deploy/Staging
- Static-friendly: no build step required.
- For staging, serve `VanOs/` as a separate site root; ensure 404 fallback is wired.
- Update `robots.txt`/`sitemap.xml` when adding routes.

## Analytics & Consent
- `assets/consent.js` shows an opt-in banner; set `data-gtag-id` on each page script tag to your GA4 ID.
- Tracking only loads after consent; stored under `vanos-consent` in `localStorage`.

## Content Hooks
- `assets/content.js` holds structured data for products and workflow steps.
- Pages render kits/accessories/steps from that data at runtime for easy edits or later CMS wiring.

## Components
- Shared styles in `assets/shared.css` (buttons, cards/panels, forms, grid, skip-link).
- Forms use accessible labels; images use `loading="lazy"` where possible.

## Checklist Fortschritt
- [x] Routing + Seitenstruktur (Home, Produkt, Über, Kontakt, 404)
- [x] Header/Footer + Navigation (Desktop/Mobile)
- [x] Grund-Komponenten: Hero, Feature-Block, Card, CTA, Formular
- [x] CMS/Content-Felder anlegen und anbinden (`assets/content.js`)
- [x] SEO-Basis: Title, Meta, OpenGraph, Sitemap, robots
- [x] Analytics + Consent (GA4/Privacy via opt-in)
- [x] Performance-Basics: Lazy Images, Shared CSS, defer Scripts
- [x] A11y: Skip-Link, Labels, Fokusreihenfolge über `main`, Kontraste geprüft
- [x] Deploy + Staging-Hinweise (static hosting, 404 fallback)
