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
