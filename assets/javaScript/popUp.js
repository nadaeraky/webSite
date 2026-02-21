window.addEventListener("load", function () {
  document.getElementById("certificatePopup").style.display = "flex";
});

function closePopup() {
  document.getElementById("certificatePopup").style.display = "none";
}

document
  .getElementById("certificatePopup")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closePopup();
    }
  });
