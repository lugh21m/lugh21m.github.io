(() => {
  const posts = Array.isArray(window.READ_POSTS) ? window.READ_POSTS : [];
  const slug = document.body.dataset.slug;
  if (!slug || !posts.length) return;

  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return;

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  const meta = document.querySelector("[data-meta]");
  if (meta) {
    const parts = [formatDate(post.date)];
    if (post.readingTime) parts.push(post.readingTime);
    meta.textContent = parts.join(" · ");
  }

  const tags = document.querySelector("[data-tags]");
  if (tags && post.tags) {
    tags.innerHTML = post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  }

  const hero = document.querySelector("[data-hero]");
  if (hero && post.cover) {
    hero.style.setProperty("--hero", post.cover);
  }

  const relatedSlot = document.querySelector("[data-related]");
  if (!relatedSlot) return;

  const related = posts
    .filter((entry) => entry.slug !== slug)
    .filter((entry) => (entry.tags || []).some((tag) => (post.tags || []).includes(tag)))
    .slice(0, 3);

  if (!related.length) {
    relatedSlot.innerHTML = `<div class="related-empty">Noch keine weiteren Artikel.</div>`;
    return;
  }

  relatedSlot.innerHTML = related
    .map((entry) => {
      const metaLine = `${formatDate(entry.date)} · ${entry.readingTime || ""}`.trim();
      return `
        <a class="related-card" href="/read/posts/${entry.slug}.html">
          <div class="related-meta">${metaLine}</div>
          <h3>${entry.title}</h3>
          <p>${entry.excerpt || ""}</p>
        </a>
      `;
    })
    .join("");
})();
