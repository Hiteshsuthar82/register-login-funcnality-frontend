import { showPopup } from "./popup.js";

const registerForm = document.getElementById("registrationForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    const response = await fetch("https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...jsonData }),
      credentials: "include",
    });
    const data = await response.json();

    if (data.status == "success") {
      showPopup("User is created successfully");
      // Redirect to index.html
      // TODO : setTimeout is used for showing successfull popup and the loader
      // TODO : imlplement the popup for regester successfull
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      // Handle errors (e.g., display error messages to the user)
      showPopup(data.message, true);
    }
  } catch (error) {
    showPopup("An error occurred while registering. Please try again.", true);
    console.error("Error Occur while fetching data : ", error);
  }
});
