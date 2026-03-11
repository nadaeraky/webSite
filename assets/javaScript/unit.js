//   ANIMATIONS 
document.addEventListener("DOMContentLoaded", () => {
  const observer1 = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scrolled");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 },
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer1.observe(el));

  const observer2 = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px", threshold: 0.1 },
  );

  document
    .querySelectorAll('[data-animate="fade-in"], [data-animate="fade-in-list"]')
    .forEach((el) => observer2.observe(el));

  // الخريجين المتميزين 
  const observer3 = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.2 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer3.observe(el));

  // ===== POPUP =====
  const popup = document.getElementById("certificatePopup");
  if (popup) {
    setTimeout(() => {
      popup.classList.add("active");
    }, 300);

    popup.addEventListener("click", function (e) {
      if (e.target === this) closePopup();
    });
  }
});

function closePopup() {
  const popup = document.getElementById("certificatePopup");
  if (!popup) return;

  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    popup.classList.remove("active");
    popup.style.opacity = "";
    popup.style.transition = "";
  }, 300);
}
