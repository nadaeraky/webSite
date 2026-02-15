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

// Swiper Slider
if (typeof Swiper !== "undefined") {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 400,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animateElements = document.querySelectorAll(".animate-on-scroll");
animateElements.forEach((element) => {
  observer.observe(element);
});

// Stats Counter Animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        statsObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((counter) => {
  statsObserver.observe(counter);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn?.classList.add("visible");
  } else {
    scrollToTopBtn?.classList.remove("visible");
  }
});

scrollToTopBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "#top") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// Loading Animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".slide-content img");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Lazy Loading Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Print Function
function printPage() {
  window.print();
}

// Share Functionality
function shareContent(platform, url, text) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  }
}

// Console Message
console.log(
  "%c المعهد العالي للهندسة والتكنولوجيا ",
  "background: #1a237e; color: #fff; padding: 10px 20px; font-size: 20px; font-weight: bold;",
);
console.log(
  "%c تم تطوير الموقع بواسطة nada eraky ",
  "color: #f59e0b; font-size: 14px; font-weight: bold;",
);

//كود صندوق الشكاوي

const inputs = document.querySelectorAll(".code-input");
if (inputs.length > 0) {
  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
  const submitBtn = complaintForm.querySelector(".submit-btn");

  if (submitBtn) {
    complaintForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        const successModal = document.getElementById("successModal");
        if (successModal) {
          successModal.style.display = "flex";
        }

        complaintForm.reset();
      }, 2000);
    });
  }
}

// 3. دالة إغلاق النافذة المنبثقة (Modal)
function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.style.display = "none";
  }
}
