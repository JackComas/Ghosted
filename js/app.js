const API_key = "INSERT_API_KEY_HERE";
// Get your API Key at https://console.cloud.google.com/apis/library/youtube.googleapis.com

/*        
<button style="max-width: 20rem; padding: 0; margin: 0" class="btn">
          <div class="card">
            <img
              src="https://i.ytimg.com/vi/_Q1kdxQUSfg/mqdefault.jpg"
              class="card-img-top"
              alt="thumbnail"
            />
            <div class="card-body">
              <h5 class="card-title">Tên Video</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">Tên Kênh</h6>
            </div>
          </div>
        </button>
 */

// Main function for getting videos

let promptDisplay = document.getElementById("prompt");

function getVideos() {
  let prompt = "Javascript Learning 2026";
  if (promptDisplay != null) {
    prompt = promptDisplay.innerText;
  }
  console.log(prompt);

  if (nextPage == "") {
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_key}&part=snippet&q=${prompt}&maxResults=20&type=video&videoDuration=medium&videoEmbeddable=true`;
  } else if (nextPage != "") {
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_key}&part=snippet&q=${prompt}&maxResults=20&type=video&videoDuration=medium&videoEmbeddable=true&pageToken=${nextPage}`;
  }
  // GET VIDEOS
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      videoList = data.items;
      nextPage = data.nextPageToken;
      console.log(nextPage);
      console.log(videoList);
      for (i = 0; i < videoList.length; i++) {
        let vidId = videoList[i].id.videoId;
        let vidTitle = videoList[i].snippet.title;
        let channelTitle = videoList[i].snippet.channelTitle;
        let vidThumb = videoList[i].snippet.thumbnails.high.url;
        let vidBox = document.getElementById("video-container");
        let vid = document.createElement("button");
        vid.style =
          "max-width: 20rem; height: 20rem; padding: 0; margin: 1rem 0.5rem;";

        // console.log(videoList[i]);
        vid.classList.add("btn");
        vid.innerHTML = `
          <div class="card" style = "height: 20rem; overflow: hidden;">
            <img
              src=${vidThumb}
              class="card-img-top"
              style = "object-fit: cover; width: 20rem; max-height: 11.25rem;"
              alt="thumbnail"
            />
            <div class="card-body">
              <h5 class="card-title">${vidTitle}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${channelTitle}</h6>
            </div>
          </div>`;
        vid.addEventListener("click", () => {
          window.location.href = `https://youtu.be/${vidId}`;
        });
        vidBox.appendChild(vid);
      }
    });
}

let search = document.getElementById("search");
search.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchPrompt = search.searchInput.value;
  localStorage.setItem("lastSearchPrompt", JSON.stringify({ searchPrompt }));
  window.location.href = "/search.html";
});

// Keeping the navbar on top while covering nothing
function navSpacing() {
  let navbar = document.getElementById("navbar-container");
  navSpacer = document.getElementById("nav-spacer");
  navSpacer.style.width = "100vw";
  navSpacer.style.height = `${navbar.clientHeight}px`;
}

// On Load Function
window.onload = function () {
  nextPage = "";
  if (promptDisplay != null) {
    const promptData = localStorage.getItem("lastSearchPrompt");
    if (!promptData) return;
    promptDisplay.innerText =
      JSON.parse(promptData).searchPrompt || "FAILED TO RECEIVE PROMPT";
  }
  if (document.getElementById("video-container") != null) {
    // getVideos();
  }
  setInterval(navSpacing, 1);
  if (forms) {
    console.log("loaded");

    let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
    if (accountDatabase != null) {
      loggedIn = accountDatabase.loggedIn;
    }
    console.log(loggedIn);
    if (loggedIn != -1) {
      this.alert("You are logged in, redirecting to Home Page.");
      window.location.href = "/index.html";
    } else {
      refillForms();
    }
  }
};

function resetLoggedIn() {
  let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  if (accountDatabase != null) {
    loggedIn = accountDatabase.loggedIn || -1;
    accountList = accountDatabase.accountList || [];
    usernameList = accountDatabase.usernameList || [];
  } else {
    accountDatabase = {
      loggedIn: -1,
      accountList: [],
      usernameList: [],
    };
  }
  loggedIn = -1;
  accountDatabase = {
    loggedIn,
    accountList,
    usernameList,
  };
  localStorage.setItem("accountDatabase", JSON.stringify(accountDatabase));
}
