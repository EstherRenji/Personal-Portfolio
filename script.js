/* ========= Utilities ========= */
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];

/* ========= Year in footer ========= */
$("#year").textContent = new Date().getFullYear();

/* ========= Theme (light/dark) ========= */
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme"); // "light" | "dark" | null
const root = document.documentElement;

function applyTheme(mode){
  if(mode === "light"){ root.classList.add("light"); }
  else { root.classList.remove("light"); } // default dark
}

applyTheme(savedTheme ?? (prefersDark ? "dark" : "light"));
if(!savedTheme && !prefersDark){ root.classList.add("light"); }

$("#theme-toggle").addEventListener("click", () => {
  const isLight = root.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  $("#theme-toggle").textContent = isLight ? "🌙" : "☀️";
});
$("#theme-toggle").textContent = root.classList.contains("light") ? "🌙" : "☀️";

/* ========= Mobile nav ========= */
const navToggle = $(".nav-toggle");
const navLinksWrap = $(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinksWrap.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
$$(".nav-link").forEach(a => a.addEventListener("click", () => {
  navLinksWrap.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

/* ========= Section reveal on scroll (IntersectionObserver) ========= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("reveal-in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

$$("[data-reveal]").forEach(el => io.observe(el));

/* ========= ScrollSpy: highlight active nav ========= */
const sections = $$("section[id]");
const navLinks = $$(".nav-link");
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
    }
  });
}, { rootMargin: "-60% 0px -35% 0px", threshold: 0.0 });

sections.forEach(sec => spy.observe(sec));






