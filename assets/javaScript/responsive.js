document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeMobileNav = document.getElementById("closeMobileNav");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const body = document.body;

  // Open mobile menu
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.add("open");
      body.style.overflow = "hidden";
    });
  }

  // Close mobile menu
  const closeMenu = () => {
    if (mobileNav) {
      mobileNav.classList.remove("open");
      body.style.overflow = "";
    }
  };

  if (closeMobileNav) {
    closeMobileNav.addEventListener("click", closeMenu);
  }

  // Mobile menu dropdowns
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      // Close all other dropdowns
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute("aria-expanded", "false");
          const otherSubmenu = otherToggle.nextElementSibling;
          if (otherSubmenu) {
            otherSubmenu.style.maxHeight = null;
          }
        }
      });

      // Toggle current dropdown
      if (!isExpanded) {
        toggle.setAttribute("aria-expanded", "true");
        if (submenu) {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
      } else {
        toggle.setAttribute("aria-expanded", "false");
        if (submenu) {
          submenu.style.maxHeight = null;
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileNav && mobileMenuBtn) {
      const isClickInside =
        mobileNav.contains(event.target) ||
        mobileMenuBtn.contains(event.target);
      if (!isClickInside && mobileNav.classList.contains("open")) {
        closeMenu();
      }
    }
  });
});
