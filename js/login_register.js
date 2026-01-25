const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
forms = true;

if (registerForm != null) {
  registerForm.addEventListener("change", function (event) {
    event.preventDefault();

    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const passwordRetype = registerForm.passwordRetype.value;

    const userRegisterData = {
      username,
      email,
      password,
      passwordRetype,
    };

    let passwordValidity = validatePassword(password);
    let usernameValidity = checkUsername(username);
    console.log(usernameValidity);
    if (usernameValidity != "") {
      registerForm.username.setCustomValidity(usernameValidity);
    } else {
      registerForm.username.setCustomValidity("");
    }
    if (passwordValidity != "") {
      registerForm.password.setCustomValidity(passwordValidity);
    } else if (password != passwordRetype) {
      registerForm.passwordRetype.setCustomValidity("Passwords must match!");
    } else {
      registerForm.password.setCustomValidity("");
      registerForm.passwordRetype.setCustomValidity("");
    }

    localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData));
    console.log(localStorage);
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = registerForm.username.value;
    let email = registerForm.email.value;
    let password = registerForm.password.value;
    let passwordRetype = registerForm.passwordRetype.value;

    if (
      validatePassword(password) == "" &&
      password == passwordRetype &&
      checkUsername(username) == ""
    ) {
      let loggedIn = -1;
      let accountList = [];
      let usernameList = [];

      let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
      if (accountDatabase != null) {
        loggedIn = accountDatabase.loggedIn || -1;
        accountList = accountDatabase.accountList || [];
        usernameList = accountDatabase.usernameList || [];
      } else {
        accountDatabase = {
          loggedIn,
          accountList,
          usernameList,
        };
      }

      const currentAccount = {
        username,
        email,
        password,
        profilePicture: null,
        savedVideos: [],
      };

      accountDatabase.accountList.push(currentAccount);
      accountDatabase.usernameList.push(username);

      localStorage.setItem("accountDatabase", JSON.stringify(accountDatabase));
      console.log(localStorage);
      alert("Registered succesfully. Redirecting to Log In page.");
      window.location.href = "/signin.html";
    }
  });
}

// LOGIN

if (loginForm != null) {
  loginForm.addEventListener("change", function (event) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    loginForm.username.setCustomValidity("");

    const userLogInData = {
      username,
      password,
    };

    localStorage.setItem("userLogInData", JSON.stringify(userLogInData));
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let usernameValidity = checkUsername(username);
    if (usernameValidity == "Username taken.") {
      loginForm.username.setCustomValidity("");
      let loggedIn = -1;
      let accountList = [];
      let usernameList = [];

      let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
      if (accountDatabase != null) {
        loggedIn = accountDatabase.loggedIn || -1;
        accountList = accountDatabase.accountList || [];
        usernameList = accountDatabase.usernameList || [];
      } else {
        accountDatabase = {
          loggedIn,
          accountList,
          usernameList,
        };
      }
      // Note: findIndex() checks for item i in accountList to see if the username and password matches, no for loop involved.
      accountIndex = accountList.findIndex(
        (i) => i.username == username && i.password == password,
      );
      if (accountIndex != -1) {
        loggedIn = accountIndex;
        currentAccount = accountList[accountIndex];
        accountDatabase = {
          loggedIn,
          accountList,
          usernameList,
        };
        localStorage.setItem(
          "accountDatabase",
          JSON.stringify(accountDatabase),
        );
        alert("Logged In successfully, redirecting to Home Page.");
        window.location.href = "/index.html";
      } else {
        alert("Wrong Log In Informations. Please Retry");
      }
    } else {
      alert("Wrong Log In Informations. Please Retry");
    }
  });
}

function refillForms() {
  if (window.performance.getEntriesByType("navigation")[0].type == "reload") {
    if (registerForm != null) {
      const regData = localStorage.getItem("userRegisterData");
      if (!regData) return;

      const data = JSON.parse(regData);
      registerForm.username.value = data.username || "";
      registerForm.email.value = data.email || "";
      registerForm.password.value = data.password || "";
      registerForm.passwordRetype.value = data.passwordRetype || "";
    }
    if (loginForm != null) {
      const logData = localStorage.getItem("userLogInData");
      if (!logData) return;

      const data = JSON.parse(logData);
      loginForm.username.value = data.username || "";
      loginForm.password.value = data.password || "";
    }
  } else {
    localStorage.setItem("userRegisterData", "");
    localStorage.setItem("userLogInData", "");
  }
}

function validatePassword(pwd) {
  const minLength = 8;

  const hasUpperCase = /[A-Z]/.test(pwd);

  const hasLowerCase = /[a-z]/.test(pwd);

  const hasNumber = /[0-9]/.test(pwd);

  const hasSpecialChar = /[@#$%^&*!]/.test(pwd);

  if (pwd.length < minLength) {
    return "Password must have at least 8 characters";
  } else if (!hasUpperCase) {
    return "Password must have at least one uppercase letter";
  } else if (!hasLowerCase) {
    return "Password must have at least one lowercase letter";
  } else if (!hasNumber) {
    return "Password must have at least one number";
  } else if (!hasSpecialChar) {
    return "Password must have at least one special character (@ # $ % …)";
  }
  return "";
}

function checkUsername(username) {
  console.log(username);
  let loggedIn = -1;
  let accountList = [];
  let usernameList = [];

  let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  if (accountDatabase != null) {
    loggedIn = accountDatabase.loggedIn || -1;
    accountList = accountDatabase.accountList || [];
    usernameList = accountDatabase.usernameList || [];
  } else {
    accountDatabase = {
      loggedIn,
      accountList,
      usernameList,
    };
  }
  if (usernameList.includes(username)) {
    return "Username taken.";
  }
  return "";
}
