// Show popup when page loads
window.addEventListener("load", function () {
  document.getElementById("certificatePopup").style.display = "flex";
});

// Close popup function
function closePopup() {
  document.getElementById("certificatePopup").style.display = "none";
}

// Close popup when clicking outside
document
  .getElementById("certificatePopup")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closePopup();
    }
  });
