// ^ 1- |========[reference input fields]========|

// & |========[Sign-up]========|

var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");

// & |========[Sign-in]========|

var signEmailInput = document.getElementById("signEmail");
var signPassInput = document.getElementById("signPass");

// ^ 2- |========[Variable to store user data]========|

var users;

// & |========[Check if there is any data stored in the local storage]========|

if (localStorage.getItem("usersList") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("usersList"));
}

// users = JSON.parse(localStorage.getItem("usersList")) ?? [];

// ^ |======== [Function to add a new user] ========|

function addUser() {
  if (isRegFormEmpty()) {
    if (isEmailAlreadyTaken()) {
      displayMessage("required", "Email already exists");
    } else {
      var user = {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPassInput.value,
      };
      users.push(user);
      localStorage.setItem("usersList", JSON.stringify(users));
      displayMessage("required", "Success", false);
    }
  } else {
    displayMessage("required", "All inputs are required");
  }
}

// & |====[helper functions]====|

function isRegFormEmpty() {
  return (
    userNameInput.value !== "" &&
    userPassInput.value !== "" &&
    userEmailInput.value !== ""
  );
}

function isEmailAlreadyTaken() {
  return users.some((user) => user.email === userEmailInput.value);
}

// ! |====[make it once !]====|

function displayMessage(elementId, message, isError = true) {
  var targetElement = document.getElementById(elementId);
  if (targetElement) {
    targetElement.innerHTML = `<span class="${
      isError ? "text-danger" : "text-success"
    }">${message}</span>`;
  }
}

// ^ |======== [Function to search for a user during the login process] ========|

function searchUser() {
  if (isLoginFormEmpty()) {
    displayMessage("result-sign", "All inputs are required");
  } else {
    if (login()) {
      location.replace("home.html");
    } else {
      displayMessage("result-sign", "Incorrect email or password");
    }
  }
}

// & |====[helper functions]====|

function isLoginFormEmpty() {
  return signEmailInput.value === "" || signPassInput.value === "";
}

function login() {
  var user = users.find(
    (user) =>
      user.email === signEmailInput.value &&
      user.password === signPassInput.value
  );
  if (user) {
    localStorage.setItem("homeList", JSON.stringify(user.name));
    return true;
  }
  return false;
}

// ^ |======== [Function to display a welcome message on the home page] ========|

function welcome() {
  document.getElementById("welcome").innerHTML = `Welcome ${JSON.parse(
    localStorage.getItem("homeList")
  )}`;
}