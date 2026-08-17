// Navigation (mobil), Scroll-Zustand des Headers, Scroll-Reveal

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

toggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  document.body.classList.toggle("nav-open");
});

nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
  })
);

const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Videa na pozadí: zpomalené přehrávání (stejně jako na původním webu)
document.querySelectorAll("video[data-rate]").forEach((v) => {
  v.playbackRate = parseFloat(v.dataset.rate);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Parallax: prvky s data-parallax se při scrollu posouvají různou rychlostí
const parallaxEls = document.querySelectorAll("[data-parallax]");
if (parallaxEls.length && !reducedMotion) {
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      el.style.transform = `translateY(${y * parseFloat(el.dataset.parallax)}px)`;
    });
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Odkrývaná patička: pojistka pro případ, že je vyšší než viewport
const footer = document.querySelector(".site-footer");
const checkFooter = () =>
  footer?.classList.toggle("static", footer.offsetHeight > window.innerHeight * 0.9);
window.addEventListener("resize", checkFooter);
checkFooter();

const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Kontaktformular: öffnet das E-Mail-Programm mit den eingegebenen Daten
const form = document.querySelector(".contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const subject = encodeURIComponent(
    `Nachricht von ${d.get("vorname")} ${d.get("nachname")}`.trim()
  );
  const body = encodeURIComponent(
    `${d.get("bericht")}\n\n${d.get("vorname")} ${d.get("nachname")}\n${d.get("email")}`
  );
  window.location.href = `mailto:aranka.pilates@web.de?subject=${subject}&body=${body}`;
});
