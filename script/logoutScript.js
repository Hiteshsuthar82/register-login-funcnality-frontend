const userListContainer = document.getElementById("userList");
const logoutBtn = document.getElementById("logoutButton");
const getAllUser = document.getElementById("get-users-btn");

window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/userValid",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();

    if (data.status !== "success") {
      window.location.href =
        "https://register-login-funcnality-frontend.vercel.app/register.html";
    } else {
      console.log(data.message);
    }
  } catch (error) {
    // TODO : imlplement the error popup for logout
    console.error("Error Occur while sending request : ", error);
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    disableEnableButton(logoutBtn, "gray", false);

    const response = await fetch(
      "https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/logout",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();

    disableEnableButton(logoutBtn, "#f44336", true);

    if (data.status == "success") {
      console.log("loged out successfully");
      // Redirect to index.html
      // TODO : setTimeout is used for showing logout message popup and the loader
      // TODO : imlplement the popup for logout successfull
      setTimeout(() => {
        window.location.href =
          "https://register-login-funcnality-frontend.vercel.app/login.html";
      }, 1000);
    } else {
      // TODO : imlplement the error popup for logout
      alert(data.message);
      console.log(data);
    }
  } catch (error) {
    // TODO : imlplement the error popup for logout
    console.error("Error Occur while sending request : ", error);
  }
});

getAllUser.addEventListener("click", async () => {
  try {
    disableEnableButton(getAllUser, "gray", false);

    const response = await fetch(
      "https://register-login-funcnality-backend-by.onrender.com/api/v1/auth/getAllUsers",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();

    disableEnableButton(getAllUser, "#2196F3", true);

    if (data.status == "success") {
      // TODO : imlplement the popup for getting user details successfully
      console.log("user details got successfully");
      console.log(data);
      renderUsers(data.data.users);
    } else {
      // TODO : imlplement the error popup for getting user details
      alert(data.message);
      console.log(data);
    }
  } catch (error) {
    // TODO : imlplement the error popup for getting user details
    console.error("Error Occur while sending request : ", error);
  }

  function renderUsers(users) {
    // Clear previous content
    userListContainer.innerHTML = "";

    // Iterate over each user and create HTML elements
    users.forEach((user, index) => {
      const userItem = document.createElement("div");
      userItem.classList.add("user-list-item");

      userItem.innerHTML = `
            <h3>${index + 1}. ${user.username}</h3>
            <p>Email: ${user.email}</p>
        `;

      userListContainer.appendChild(userItem);
    });
  }
});

function disableEnableButton(element, color, cursor) {
  element.style.backgroundColor = color;
  if (cursor) {
    element.style.cursor = "pointer";
  } else {
    element.style.cursor = "not-allowed";
  }
}
