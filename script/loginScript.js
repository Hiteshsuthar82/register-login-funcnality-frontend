import { showPopup } from "./popup.js";

const loginForm = document.getElementById("loginForm");
const forgotPassBtn = document.getElementById("forgot-password-button");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const emailPopup = document.getElementById("emailPopup");
const emailPopupOverlay = document.querySelector(".email-popup-overlay");
const closeEmailPopup = document.getElementById("closeEmailPopup");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    const response = await fetch("https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...jsonData }),
      credentials: "include",
    });
    const data = await response.json();

    if (data.status === "success") {
      console.log(data);
      // Redirect to index.html
      // TODO : setTimeout is used for showing successfull popup and the loader
      // TODO : imlplement the popup for login successfull
      showPopup("user Loged in successfully");
      setTimeout(() => {
        console.log('you are loged in');
        window.location = "https://register-login-funcnality-frontend.vercel.app/";
      }, 5000);
    } else {
      showPopup(data.message, true);
    }
  } catch (error) {
    showPopup("An error occurred while registering. Please try again.", true);
    console.error("Error Occur while sending request : ", error);
  }
});

forgotPassBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  console.log(username.trim() == "");
  if (username.trim() == "") {
    showPopup(
      "username is required when you forgot your account's password",
      true
    );
    document.getElementById("username").focus();
    return;
  }

  try {
    const response = await fetch(
      "https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/forgotPassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      console.log(
        "your username is correct we are sending you to email input page"
      );
      openEmailPopup();
      closeEmailPopup.addEventListener("click", closeEmailPopupFunction);
      emailPopupOverlay.addEventListener("click", closeEmailPopupFunction);
    } else {
      showPopup(data.message, true);
    }
  } catch (error) {
    // Handle errors (e.g., display error messages to the user)
    console.log(error);
    showPopup(error.message, true);
  }
});

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("forgotEmail").value;

  try {
    const response = await fetch(
      "https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/forgotPassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      showPopup("your email is correct & email is sent to you email address");
      setTimeout(() => {
        window.location.href = "emailSentSuccessPage.html";
      }, 1000);
    } else {
      showPopup(data.message, true);
      console.log(data);
    }
  } catch (error) {
    // Handle errors (e.g., display error messages to the user)
    console.log(error);
    showPopup(error.message, true);
  }
});

function openEmailPopup() {
  emailPopup.style.display = "block";
  emailPopupOverlay.style.display = "block";
}

// Function to close email popup
function closeEmailPopupFunction() {
  emailPopup.style.display = "none";
  emailPopupOverlay.style.display = "none";
}
