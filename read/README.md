# Read Blog System

Kurzanleitung zum Veröffentlichen neuer Beiträge.

1) Beitrag anlegen
- Kopiere `read/posts/_template.html` nach `read/posts/dein-slug.html`.
- Ersetze `[slug]`, `[Titel]`, `[Kurzbeschreibung]`, Datum und Inhalt.

2) Beitrag im Index sichtbar machen
- Ergänze einen neuen Eintrag in `read/posts.js`.
- Pflichtfelder: `title`, `slug`, `date` (YYYY-MM-DD), `excerpt`.

Beispiel:
```js
{
  title: "Mein neuer Beitrag",
  slug: "mein-neuer-beitrag",
  date: "2024-09-10",
  excerpt: "Kurzbeschreibung des Inhalts."
}
```

3) Optional: SEO
- Füge die neue URL in `sitemap.xml` ein, wenn der Beitrag indexiert werden soll.

Preview: Öffne `read/index.html` im Browser, um Liste + Post zu prüfen.
