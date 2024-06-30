const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopupBtn = document.getElementById("close-popup");

closePopupBtn.addEventListener("click", hidePopup);

export function showPopup(message, error=false) {
  if (error) {
    popup.style.backgroundColor = "#f44336";
  }else{
    popup.style.backgroundColor = "#28a745";
  }
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
  popup.classList.add("visible");

  setTimeout(hidePopup, 3000);
}

function hidePopup() {
  popup.classList.remove("visible");
  popup.classList.add("hidden");
}