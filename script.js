/* =========================================================
   Prajum Patel portfolio interactions
   Update the settings below before publishing your website.
   ========================================================= */

/* ---------- 1. Contact form configuration ---------- */
const PORTFOLIO_EMAIL = "patelprajum.com";

/* ---------- 2. Theme switch ---------- */
const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("prajum-theme");

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("prajum-theme", nextTheme);
});

/* ---------- 3. Mobile navigation ---------- */
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Close the mobile menu with Escape. */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

/* ---------- 4. Header and back-to-top button ---------- */
const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");

function updateScrollUI() {
  const hasScrolled = window.scrollY > 30;
  header?.classList.toggle("scrolled", hasScrolled);
  backToTop?.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- 5. Reveal elements as they enter the page ---------- */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

/* ---------- 6. Highlight the current navigation section ---------- */
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ---------- 7. Contact form: prepare an email ---------- */
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  if (PORTFOLIO_EMAIL.includes("patelprajum@gmail.com")) {
    formStatus.textContent =
      "Please add your email address in script.js before using the contact form.";
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const service = String(formData.get("service")).trim();
  const message = String(formData.get("message")).trim();

  const subject = encodeURIComponent(`Portfolio enquiry: ${service}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService required: ${service}\n\nProject description:\n${message}`
  );

  formStatus.textContent = "Opening your email app with the project details.";
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
});

/* ---------- 8. Footer year ---------- */
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();