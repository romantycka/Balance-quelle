// Obsah spravovaný přes administraci (/admin/): ceny, aktuality, popup.
// Statický obsah v HTML zůstává jako fallback — přepíše se jen při úspěšném
// načtení JSON, takže bez content/ souborů web vypadá beze změny.

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const loadJSON = async (path) => {
  try {
    const r = await fetch(path, { cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
};

// --- Ceník (pilates.html / reiki.html / massage.html) ---
const priceList = document.querySelector("[data-preise]");
if (priceList) {
  loadJSON("content/preise.json").then((data) => {
    const items = data?.[priceList.dataset.preise];
    if (!Array.isArray(items) || !items.length) return;
    priceList.innerHTML = items
      .map(
        (i) => `<li>
          <span class="what">${escapeHtml(i.name)}<span class="meta">${escapeHtml(i.dauer)}</span></span>
          <span class="price">${escapeHtml(i.preis)}</span>
        </li>`
      )
      .join("");
  });
}

// --- Aktuality (aktuelles.html) ---
const postsWrap = document.querySelector("[data-aktuelles]");
if (postsWrap) {
  loadJSON("content/aktuelles.json").then((data) => {
    const posts = data?.beitraege;
    if (!Array.isArray(posts) || !posts.length) return;
    postsWrap.innerHTML = posts
      .map(
        (p) => `<article class="post-card">
          <img src="${escapeHtml(p.bild)}" alt="${escapeHtml(p.titel)}" loading="lazy">
          <div class="post-body">
            <p class="post-date">${escapeHtml(p.datum)}</p>
            <h3>${escapeHtml(p.titel)}</h3>
          </div>
        </article>`
      )
      .join("");
  });
}

// --- Popup s oznámením (index.html) ---
const popup = document.getElementById("popup");
if (popup) {
  loadJSON("content/popup.json").then((data) => {
    // aktiv: "ano" z administrace (starší verze používaly true)
    const zapnuto = data?.aktiv === true || String(data?.aktiv).toLowerCase() === "ano";
    if (!zapnuto || sessionStorage.getItem("popupDismissed")) return;

    popup.querySelector("h3").textContent = data.titel ?? "";
    const textEl = popup.querySelector(".popup-text");
    textEl.textContent = data.text ?? "";
    textEl.hidden = !data.text;

    const img = popup.querySelector(".popup-bild");
    if (data.bild) {
      img.src = data.bild;
      img.alt = data.titel ?? "";
      img.hidden = false;
    }

    const btn = popup.querySelector(".popup-btn");
    if (data.button_text && data.button_link) {
      btn.textContent = data.button_text;
      btn.href = data.button_link;
      btn.hidden = false;
    }

    popup.hidden = false;
    document.body.classList.add("popup-open");

    const close = () => {
      popup.hidden = true;
      document.body.classList.remove("popup-open");
      sessionStorage.setItem("popupDismissed", "1");
    };
    popup.querySelector(".popup-close").addEventListener("click", close);
    popup.addEventListener("click", (e) => {
      if (e.target === popup) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !popup.hidden) close();
    });
  });
}
