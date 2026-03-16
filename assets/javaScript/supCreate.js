document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeMobileNav = document.getElementById("closeMobileNav");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const body = document.body;

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.add("open");
      body.style.overflow = "hidden";
    });
  }

  const closeMenu = () => {
    if (mobileNav) {
      mobileNav.classList.remove("open");
      body.style.overflow = "";
    }
  };

  if (closeMobileNav) closeMobileNav.addEventListener("click", closeMenu);

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      dropdownToggles.forEach((other) => {
        if (other !== toggle) {
          other.setAttribute("aria-expanded", "false");
          const otherSub = other.nextElementSibling;
          if (otherSub) otherSub.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        toggle.setAttribute("aria-expanded", "true");
        if (submenu) submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        toggle.setAttribute("aria-expanded", "false");
        if (submenu) submenu.style.maxHeight = null;
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (mobileNav && mobileMenuBtn) {
      const inside =
        mobileNav.contains(event.target) ||
        mobileMenuBtn.contains(event.target);
      if (!inside && mobileNav.classList.contains("open")) closeMenu();
    }
  });
});

// Scroll Animations (animate-on-scroll)
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".animate-on-scroll")
  .forEach((el) => scrollObserver.observe(el));

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "#top") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target)
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
    }
  });
});

window.addEventListener("load", () => document.body.classList.add("loaded"));
