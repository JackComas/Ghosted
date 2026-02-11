const API_key = "AIzaSyCmKXIR9SWhxI5gF94jfohAnPPY3TMdTgo";
// const API_key = "INSERT_API_KEY_HERE";
// Bro why isn't this working
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
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_key}&part=snippet&q=${prompt}%20coding%20tutorial&maxResults=20&type=video&videoDuration=medium&videoEmbeddable=true`;
  } else if (nextPage != "") {
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_key}&part=snippet&q=${prompt}%20coding%20tutorial&maxResults=20&type=video&videoDuration=medium&videoEmbeddable=true&pageToken=${nextPage}`;
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
          "max-width: 20rem; height: 25rem; padding: 0rem; margin: 1rem 0.5rem; border: none; background: transparent;";

        // console.log(videoList[i]);
        vid.classList.add("div");
        vid.innerHTML = `
        <button class="btn" onclick="gotoVideo('${vidId}')" style="max-width: 20rem; height: 26rem;">
          <div class="card" style = "height: 25rem; overflow: hidden;">
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
                                      
                <div
          class="row align-items-start"
          style="line-height: normal; text-align: left; padding: 1rem"
        >
        </div>

          </div>
        </button>
        <button
          class="btn btn-primary save-btn"
          style="margin: 0rem 0.25rem; position: relative; bottom: 4rem; padding: 0.5rem 5rem;"
          onclick="saveVideo('${vidId}');">
          Save
        </button>`;
        vid.classList.add("text-center");
        vidBox.appendChild(vid);
      }
    });
}

let search = document.getElementById("search");
search.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchPrompt = search.searchInput.value;
  localStorage.setItem("lastSearchPrompt", JSON.stringify({ searchPrompt }));
  window.location.href = getCurrentLink() + "/search.html";
});
let savedVideoContainers = document.getElementById("saved-video-container");
let accountButton = document.getElementById("account-btn");

// On Load Function
window.onload = function () {
  // GET LOG IN STATE
  nextPage = "";
  let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  if (accountDatabase != null) {
    loggedIn = accountDatabase.loggedIn;
  }

  // Change navbar if logged in
  if (loggedIn != -1) {
    accountButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>`;
    accountButton.href = `${getCurrentLink() + "/account.html"}`;
  }

  // GET PROMPT (SEARCH)
  if (promptDisplay != null) {
    const promptData = localStorage.getItem("lastSearchPrompt");
    if (!promptData) return;
    promptDisplay.innerText =
      JSON.parse(promptData).searchPrompt || "FAILED TO RECEIVE PROMPT";
  }

  // GET VIDEOS
  if (document.getElementById("video-container") != null) {
    getVideos();
  }

  if (document.getElementById("saved-video-container") != null) {
    getSavedVids();
  }

  // NAV SPACING
  setInterval(pageSpacing, 1);

  // LOGGED IN WHILE SIGNING IN OR SIGNING UP
  if (forms) {
    if (loggedIn != -1) {
      this.alert("You are logged in, redirecting to Home Page.");
      window.location.href = getCurrentLink();
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
  alert("Successfully logged out, redirecting to Home Page.");
  window.location.href = getCurrentLink();
}

// FILL SAVED VIDS
function getSavedVids() {
  let container = document.getElementById("saved-video-container");
  let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  if (accountDatabase != null) {
    loggedIn = accountDatabase.loggedIn;
    accountList = accountDatabase.accountList || [];
    usernameList = accountDatabase.usernameList || [];
  } else {
    accountDatabase = {
      loggedIn: -1,
      accountList: [],
      usernameList: [],
    };
  }
  videoList = accountList[loggedIn].savedVideos;
  for (i = 0; i < videoList.length; i++) {
    vidID = videoList[i];
    url = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${vidID}&key=${API_key}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        videoList = data.items;
        nextPage = data.nextPageToken;
        let vidId = videoList[0].id.videoId;
        let vidTitle = videoList[0].snippet.title;
        let channelTitle = videoList[0].snippet.channelTitle;
        let vidThumb = videoList[0].snippet.thumbnails.high.url;
        let vidBox = container;
        let vid = document.createElement("button");
        vid.style =
          "max-width: 20rem; height: 25rem; padding: 0rem; margin: 1rem 0.5rem; border: none; background: transparent;";

        vid.classList.add("div");
        vid.innerHTML = `
        <button class="btn" onclick="gotoVideo('${vidId}')" style="max-width: 20rem; height: 26rem;">
          <div class="card" style = "height: 25rem; overflow: hidden;">
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
                                      
                <div
          class="row align-items-start"
          style="line-height: normal; text-align: left; padding: 1rem"
        >
        </div>

          </div>
        </button>
        <button
          class="btn btn-primary save-btn"
          id="${vidID}"
          style="margin: 0rem 0.25rem; position: relative; bottom: 4rem; padding: 0.5rem 5rem;"
          onclick="removeSavedVideo(this.id);">
          Remove
        </button>`;
        vid.classList.add("text-center");
        vidBox.appendChild(vid);
      });
  }
}
function saveVideo(videoID) {
  let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  if (accountDatabase != null) {
    loggedIn = accountDatabase.loggedIn;
    accountList = accountDatabase.accountList || [];
    usernameList = accountDatabase.usernameList || [];
  } else {
    accountDatabase = {
      loggedIn: -1,
      accountList: [],
      usernameList: [],
    };
  }
  if (loggedIn == -1) {
    alert("You need an account to do this action.");
  } else {
    if (accountList[loggedIn].savedVideos.indexOf(videoID) != -1) {
      alert("This video is already saved");
    } else {
      accountList[loggedIn].savedVideos.push(videoID);
    }
  }
  accountDatabase = {
    loggedIn,
    accountList,
    usernameList,
  };
  localStorage.setItem("accountDatabase", JSON.stringify(accountDatabase));
}
function removeSavedVideo(videoID) {
  alert("This feature is currently under construction");
  // console.log(videoID);
  // let accountDatabase = JSON.parse(localStorage.getItem("accountDatabase"));
  // if (accountDatabase != null) {
  //   loggedIn = accountDatabase.loggedIn;
  //   accountList = accountDatabase.accountList;
  //   usernameList = accountDatabase.usernameList;
  // } else {
  //   accountDatabase = {
  //     loggedIn: -1,
  //     accountList: [],
  //     usernameList: [],
  //   };
  // }

  // console.log(accountDatabase.accountList[loggedIn].savedVideos);

  // vidArr = accountDatabase.accountList[loggedIn].savedVideos;
  // if (loggedIn == -1) {
  //   alert("You need an account to do this action.");
  // } else {
  //   removing = -1;
  //   for (i = 0; i <= vidArr.length; i++) {
  //     if (vidArr[i] == videoID) {
  //       removing = i;
  //       break;
  //     }
  //   }
  //   if (removing != -1) {
  //     accountList[loggedIn].savedVideos = accountList[
  //       loggedIn
  //     ].savedVideos.filter((i) => i != videoID);
  //     alert("Video removed, reloading page.");
  //     localStorage.setItem("accountDatabase", JSON.stringify(accountDatabase));
  //     window.location.reload();
  //   }
  // }
  // accountDatabase = {
  //   loggedIn,
  //   accountList,
  //   usernameList,
  // };
  // localStorage.setItem("accountDatabase", JSON.stringify(accountDatabase));
}
function gotoVideo(videoID) {
  window.location.href = `https://youtu.be/${videoID};`;
}

// PAGE ADJUSTMENTS
function pageSpacing() {
  let navbar = document.getElementById("navbar-container");
  let vidContainer = document.getElementById("video-container");
  let savedVidContainer = document.getElementById("saved-video-container");
  viewportWidth = window.innerWidth;
  if (vidContainer != null) {
    vidContainer.style = `grid-template-columns: repeat(${Math.floor((window.innerWidth - 16) / 320)}, 1fr);`;
  }
  if (savedVidContainer != null) {
    savedVidContainer.style = `grid-template-columns: repeat(${Math.floor((window.innerWidth - 16) / 320)}, 1fr);`;
  }

  navSpacer = document.getElementById("nav-spacer");
  navSpacer.style.width = "100vw";
  navSpacer.style.height = `${navbar.clientHeight}px`;
}
