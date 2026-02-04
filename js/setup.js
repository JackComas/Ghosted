// CSS files
let css = {
  bootstrap:
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css",
  main: "css/style.css",
};

let scripts = {
  bootstrap:
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js",
  main: "js/app.js",
};

// Add Main CSS
let mainCSS = document.createElement("link");

mainCSS.href = css.main;
mainCSS.rel = "stylesheet";
document.head.appendChild(mainCSS);

// Add Bootstrap CSS
let bootstrapCSS = document.createElement("link");

bootstrapCSS.href = css.bootstrap;
bootstrapCSS.crossOrigin = "anonymous";
bootstrapCSS.integrity =
  "sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB";
bootstrapCSS.rel = "stylesheet";

document.head.appendChild(bootstrapCSS);

// Add Bootstrap Scripts
let bootstrapJS = document.createElement("script");

bootstrapJS.src = scripts.bootstrap;
bootstrapJS.crossOrigin = "anonymous";
bootstrapJS.integrity =
  "sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI";
document.body.appendChild(bootstrapJS);

// Add Main CSS
let mainJS = document.createElement("script");

mainJS.src = scripts.main;
document.body.appendChild(mainJS);

// Add Navbar

let header = document.createElement("header");
header.id = "navbar-container";
header.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#"><h3>Ghosted</h3></a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/index.html"
                  >Home</a
                >
              </li>
            </ul>
            <form class="d-flex" role="search" id="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchInput"
                id="searchInput"
                required
              />
              <button class="btn btn-outline-success" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                  />
                </svg>
              </button>
            </form>
            <div class="icn">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/signin.html"
                    id="account"
                    >Log In/Register</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>`;

let navSpacer = document.createElement("div");
navSpacer.id = "nav-spacer";
document.body.prepend(navSpacer);

document.body.appendChild(header);

var forms = false;

function getCurrentLink() {
  text = window.location.href;
  const URLParts = text.split("/");
  const isHTML = URLParts[URLParts.length - 1].includes(".html");

  console.log(isHTML);
  if (isHTML) {
    return URLParts.slice(0, URLParts.length - 1).join("/");
  } else {
    return URLParts.join("/");
  }
}
