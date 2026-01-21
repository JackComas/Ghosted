const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
forms = true;

if (registerForm != null) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = registerForm.username.value;
    const email = registerForm.email.value;
    // const password = registerForm.password.value;
    // const passwordRetype = registerForm.passwordRetype.value;

    const password = "";
    const passwordRetype = "";

    const userRegisterData = {
      username,
      email,
      password,
      passwordRetype,
    };

    localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData));
    console.log(localStorage);
    alert("Lưu thành công vào Local Storage");
  });
}

// LOGIN

if (loginForm != null) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const userLogInData = {
      username,
      password,
    };

    localStorage.setItem("userLogInData", JSON.stringify(userLogInData));
    alert("Lưu thành công vào Local Storage");
  });
}

function refillForms() {
  if (registerForm != null) {
    const regData = localStorage.getItem("userRegisterData");
    if (!regData) return;

    const data = JSON.parse(regData);
    registerForm.username.value = data.username || "";
    registerForm.email.value = data.email || "";
    // registerForm.password.value = data.password || "";
    // registerForm.passwordRetype.value = data.passwordRetype || "";
  }
  if (loginForm != null) {
    const logData = localStorage.getItem("userLogInData");
    if (!logData) return;

    const data = JSON.parse(logData);
    loginForm.username.value = data.username || "";
    loginForm.password.value = data.password || "";
  }
}
