(() => {
  const posts = Array.isArray(window.READ_POSTS) ? window.READ_POSTS : [];
  const list = posts.filter((post) => post.status !== "draft");
  const postsSlot = document.querySelector("[data-posts]");
  const emptySlot = document.querySelector("[data-empty]");

  if (!postsSlot) return;

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  if (!list.length) {
    if (emptySlot) {
      emptySlot.textContent = "Noch keine Artikel.";
      emptySlot.hidden = false;
    }
    return;
  }

  list.sort((a, b) => new Date(b.date) - new Date(a.date));

  postsSlot.innerHTML = list
    .map((post, index) => {
      const excerpt = post.excerpt ? `<span class="post-excerpt">${post.excerpt}</span>` : "";
      return `
        <article class="post-row" style="--i:${index}">
          <a class="post-link" href="/read/posts/${post.slug}.html" aria-label="${post.title}">
            <span class="post-date">${formatDate(post.date)}</span>
            <span class="post-title">${post.title}</span>
            ${excerpt}
          </a>
        </article>
      `;
    })
    .join("");

  if (emptySlot) {
    emptySlot.hidden = true;
  }
})();
