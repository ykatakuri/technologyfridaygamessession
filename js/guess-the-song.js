function changeElementVisibility(element, visibilityState) {
  element.style.visibility = visibilityState;
}

let fillbar = document.querySelector(".fill");

let songNumber = document.getElementById("song-number");

let mainPlayer = new Audio();
let asidePlayer = new Audio();
let currentSong = 0;

window.onload = playSong;

function playSong() {
    if (currentSong === 15) {
      document.querySelector(".player").style.display = "none";
      changeElementVisibility(document.getElementById("aside-container"), "hidden");
      changeElementVisibility(document.querySelector(".aside-play-buttons"), "hidden");
      changeElementVisibility(document.getElementById("main-container"), "visible");
      changeElementVisibility(document.getElementById("video"), "visible");
      changeElementVisibility(document.getElementById("button-container"), "visible");
    } else if (currentSong > 30) {
      mainPlayer.pause();
      asidePlayer.pause();
      document.querySelector(".player").style.display = "none";
      changeElementVisibility(document.getElementById("aside-container"), "hidden");
      changeElementVisibility(document.querySelector(".aside-play-buttons"), "hidden");
      changeElementVisibility(document.getElementById("main-container"), "visible");
      changeElementVisibility(document.getElementById("video"), "visible");
      changeElementVisibility(document.getElementById("button-container"), "visible");
      document.getElementById("video").src = "./assets/videos/magic-system.webm";
      document.getElementById("button-next").textContent = "Retour";
      document.getElementById("button-next").setAttribute("onclick", "displayMenu()");
    }
    
    fetch('https://mtn-gaming.herokuapp.com/guessTheSong')
    .then(response => response.json())
    .then(data => {
      changeElementVisibility(document.getElementById("aside-container"), "visible");
      changeElementVisibility(document.querySelector(".aside-play-buttons"), "visible");
      songNumber.textContent = `N° ${data[currentSong].id}`;
      mainPlayer.src = data[currentSong].source_altered;
      document.getElementById("answer-artist").textContent = `Artiste(s): ${data[currentSong].artist}`;
      document.getElementById("answer-title").textContent = `Titre: ${data[currentSong].title}`;
      asidePlayer.src = data[currentSong].source_original;
      mainPlayer.play();
    })
    .catch(error => console.log(error));
}

function togglePlayPauseMainPlayer() {
  let playButton = document.querySelector(".play-pause");
  if (mainPlayer.paused) {
    mainPlayer.play();
    playButton.innerHTML = '<i class="fa fa-pause"></i>';
    playButton.style.paddingLeft = "30px";
  } else {
    mainPlayer.pause();
    playButton.innerHTML = '<i class="fa fa-play"></i>';
    playButton.style.paddingLeft = "33px";
  }
}

function togglePlayPauseAsidePlayer() {
  let playButton = document.querySelector(".aside-play-pause");
    if (asidePlayer.paused) {
      asidePlayer.play();
      playButton.innerHTML = '<i class="fa fa-pause"></i>';
      playButton.style.paddingLeft = "30px";
    } else {
      asidePlayer.pause();
      playButton.innerHTML = '<i class="fa fa-play"></i>';
      playButton.style.paddingLeft = "33px";
    }
  }

  mainPlayer.addEventListener("timeupdate", function() {
    let position = mainPlayer.currentTime / mainPlayer.duration;
  fillbar.style.width = position * 100 + "%";

  convertTime(Math.round(mainPlayer.currentTime));

    if (mainPlayer.ended) {
      mainPlayer.paused;
    }
  });

  function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
  }

function nextAudio() {
  currentSong++;
  playSong();
  playButton = document.querySelector(".play-pause");
  playButton.innerHTML = '<i class="fa fa-pause"></i>';
  playButton.style.paddingLeft = "30px";
  changeElementVisibility(document.getElementById("answer-container"), "hidden");
    changeElementVisibility(document.getElementById("answer-artist"), "hidden");
    changeElementVisibility(document.getElementById("answer-title"), "hidden");
}

function previousAudio() {
  currentSong--;
  fetch('https://mtn-gaming.herokuapp.com/guessTheSong')
    .then(response => response.json())
    .then(data => {
        if (currentSong < 0) {
            currentSong = data.length - 1;
          }
    })
    .catch(error => console.log(error));
  
  playSong();
  playButton = document.querySelector(".play-pause");
  playButton.innerHTML = '<i class="fa fa-pause"></i>';
  playButton.style.paddingLeft = "30px";
}

function decreaseVolume() {
  mainPlayer.volume -= 0.25;
}

function increaseVolume() {
  mainPlayer.volume += 0.25;
}

let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function() {
  if (mainPlayer.volume === 1) {
    mainPlayer.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    mainPlayer.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});

function continueAfterTheBreak() {
  changeElementVisibility(document.getElementById("main-container"), "hidden");
  changeElementVisibility(document.getElementById("video"), "hidden");
  changeElementVisibility(document.getElementById("button-container"), "hidden");
  document.querySelector(".player").style.display = "block";
  changeElementVisibility(document.getElementById("aside-container"), "visible");
  document.getElementById("video").src = "";
  nextAudio();
}

function displayMenu() {
    window.location.replace("games.html");
}

function displayAnswer() {
  changeElementVisibility(document.getElementById("answer-container"), "visible");
  changeElementVisibility(document.getElementById("answer-artist"), "visible");
  changeElementVisibility(document.getElementById("answer-title"), "visible");
}