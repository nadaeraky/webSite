// AOS init
AOS.init({ duration: 700, once: true, offset: 60 });

// Scroll to top
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn?.classList.toggle("visible", window.scrollY > 300);
});
