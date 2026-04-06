// =============================================
// TYSECA – main.js
// =============================================

// ── Mobile menu toggle ──
const btn = document.getElementById("hamburger-btn");
const nav = document.getElementById("main-nav");
btn.addEventListener("click", () => {
  nav.classList.toggle("header__nav--open");
});

// ── Carrusel de logos (Hero) ──
const heroImgs = document.querySelectorAll(".hero__carousel-img");
let heroCurrent = 0;

function showHeroSlide(index) {
  heroImgs.forEach((img, i) => {
    img.classList.toggle("hero__carousel-img--active", i === index);
  });
}

showHeroSlide(0);

setInterval(() => {
  heroCurrent = (heroCurrent + 1) % heroImgs.length;
  showHeroSlide(heroCurrent);
}, 2500);

// ── Carruseles de cards de servicios ──
const carouselGroups = {};
document.querySelectorAll("[data-carousel]").forEach((img) => {
  const key = img.dataset.carousel;
  if (!carouselGroups[key]) carouselGroups[key] = [];
  carouselGroups[key].push(img);
});

Object.values(carouselGroups).forEach((imgs) => {
  let idx = imgs.findIndex((i) =>
    i.classList.contains("svc-card__img--active"),
  );
  if (idx < 0) idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove("svc-card__img--active");
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add("svc-card__img--active");
  }, 3000);
});

// ── Cerrar modales con ESC ──
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal--open")
      .forEach((m) => m.classList.remove("modal--open"));
  }
});

// ── Sliders de clientes con dots ──
document.querySelectorAll(".cliente-card__slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".cliente-card__slide");
  const dotsWrap = slider.querySelector(".cliente-card__dots");
  let current = [...slides].findIndex((s) => s.classList.contains("active"));
  if (current < 0) current = 0;

  // Generar dots dinámicamente
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "cliente-card__dot" + (i === current ? " active" : "");
    dot.setAttribute("aria-label", "Ver imagen " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove("active");
    dotsWrap.children[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dotsWrap.children[current].classList.add("active");
  }

  if (slides.length > 1) {
    setInterval(() => goTo((current + 1) % slides.length), 3000);
  }
});

// ── Modales HRD y Ablerex ──
function setupModal(triggerId, modalId, closeId, contactoIds = []) {
  const trigger = document.getElementById(triggerId);
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeId);

  if (!trigger || !modal) return;

  const open = () => modal.classList.add("modal--open");
  const close = () => modal.classList.remove("modal--open");

  trigger.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  contactoIds.forEach((id) => {
    document.getElementById(id)?.addEventListener("click", close);
  });
}

setupModal("trigger-hrd", "modal-hrd", "close-hrd", [
  "hrd-contacto-1",
  "hrd-contacto-2",
  "hrd-contacto-3",
]);
setupModal("trigger-ablerex", "modal-ablerex", "close-ablerex");
