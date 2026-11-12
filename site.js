(function () {
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  if (dateEl && timeEl) {
    const tz = "Europe/Prague";
    const dateFmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", month: "short", day: "numeric", year: "numeric" });
    const timeFmt = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => {
      const now = new Date();
      dateEl.textContent = dateFmt.format(now);
      timeEl.textContent = timeFmt.format(now);
    };
    tick();
    setInterval(tick, 1000);
  }

  const list = document.getElementById("posts");
  if (list && typeof POSTS !== "undefined") {
    const limit = Number(list.dataset.limit) || Infinity;
    const base = list.dataset.base || "";
    if (POSTS.length === 0) {
      list.outerHTML = '<p class="empty">Nothing yet.</p>';
      return;
    }
    for (const post of POSTS.slice(0, limit)) {
      const li = document.createElement("li");
      const time = document.createElement("time");
      time.dateTime = post.date;
      time.textContent = post.date;
      const a = document.createElement("a");
      a.href = `${base}${post.slug}.html`;
      a.textContent = post.title;
      li.append(time, a);
      list.append(li);
    }
    const more = document.getElementById("more");
    if (more && POSTS.length > limit) more.hidden = false;
  }
})();
