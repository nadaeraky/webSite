document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 576) {
    if (typeof AOS !== "undefined") {
      AOS.init({
        disable: "mobile",
        duration: 0,
        once: false,
      });
    }

    const aosElements = document.querySelectorAll("[data-aos]");
    aosElements.forEach((element) => {
      element.style.transform = "none";
      element.style.opacity = "1";
      element.classList.remove("aos-animate");
    });
  } else {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        offset: 50,
        delay: 0,
      });
    }
  }

  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth <= 576) {
        const aosElements = document.querySelectorAll("[data-aos]");
        aosElements.forEach((element) => {
          element.style.transform = "none";
          element.style.opacity = "1";
        });
      } else {
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      }
    }, 250);
  });
});
