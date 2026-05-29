const tracks = [
  { name: "Louie Louie - THE KINGSMEN", file: "audio/THE KINGSMEN - Louie louie (Narcose).mp3", duration: "3:18" },
  { name: "Blietzkrieeg bop - THE RAMONES", file: "audio/ZOOM0110 - Blietzkrieg bop (structure Eon).mp3", duration: "3:55" },
  { name: "Smoke joke coke - EoN", file: "audio/ZOOM0151 - Smoke Joke Coke (Full Eon).mp3", duration: "4:33" },
  { name: "I wanna be your dog - THE STROOGES", file: "audio/ZOOM0149 - I wanna be your dog (structure Eon).mp3", duration: "5:44" },
  { name: "Skyzofunkiller - NARCOSE", file: "audio/NARCOSE-Skyzofunkiller.mp3", duration: "4:20" },
  { name: "Margarita baby - EoN", file: "audio/ZOOM0157 - Margarita baby.mp3", duration: "4:00" },
  { name: "Fortunate son - CCR", file: "audio/CCR - fortunate son (Narcose).mp3", duration: "2:40" },
  { name: "Johnny - THIN LIZZY", file: "audio/ZOOM0152 - Johnny (fin Eon).mp3", duration: "4:55" },
  { name: "J'ai raté ma vie - EoN", file: "audio/ZOOM0202 - EoN - J'ai raté ma vie.mp3", duration: "5:25" },
  { name: "In bloom - NIRVANA", file: "audio/ZOOM0198-5- NIRVANA - In Bloom.mp3", duration: "4:06" },
  { name: "Antarès - EoN", file: "audio/ZOOM0198-4- EoN - Antarès.mp3", duration: "6:19" },
  { name: "I hate you - Verbal abuse", file: "audio/Verbal Abuse - I Hate You (structure EoN).mp3", duration: "3:03" },
  { name: "London calling - THE CLASH", file: "audio/ZOOM0085 - London calling (fin Eon).mp3", duration: "3:41" },
  { name: "Parralel universe - RHCP", file: "audio/ZOOM0197-7-RHCP - Parrallel universe.mp3", duration: "4:34" },
  { name: "Break free - QUEEN", file: "audio/QUEEN - Break free (Narcose).mp3", duration: "3:00" },
  { name: "Addicted to you - NARCOSE", file: "audio/NARCOSE - Addicted to you.mp3", duration: "6:01" },
  { name: "Vortex - EoN", file: "audio/Eon - Vortex 08.04 (version Dam).mp3", duration: "4:00" },
  { name: "7 Nation army - THE WHITE STRIPES", file: "audio/THE WHITE STRIPES - 7 Nation army (Narcose).mp3", duration: "6:18" },
  { name: "Mirroir flou - EoN", file: "audio/ZOOM0197-9-EoN - Mirroir flou.mp3", duration: "4:33" },
  { name: "Comfortably numb - PINK FLOYD", file: "audio/PINK FLOYD - confortably numb (Narcose).mp3", duration: "6:57" },
  { name: "Namur - NARCOSE", file: "audio/NARCOSE-Namur.mp3", duration: "3:02" },
  { name: "Le brio - BIG SOUL", file: "audio/BIG SOUL - Le Brio.mp3", duration: "2:06" }, 
  { name: "Ace of spades - MOTORHEAD", file: "audio/ZOOM0158 - Ace of Spades (normal).mp3", duration: "3:09" }, 
  { name: "Stitch Jones - NARCOSE", file: "audio/NARCOSE-Stitch Jones.mp3", duration: "6:00" }, 
  { name: "Cum on feel the noize - SLADE", file: "audio/ZOOM0159- Cum on feel the noize (fin Eon).mp3", duration: "4:51" }, 
  { name: "Made in China - NARCOSE", file: "audio/NARCOSE-Made in China.mp3", duration: "5:43" }, 
  { name: "Psycho killer - TALKING HEADS", file: "TALKING HEADS - Psycho Killer.mp3", duration: "4:20" },
  
  
    
   
];


let current = 0;
let repeatMode = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playlistDiv = document.getElementById("playlist");
const searchInput = document.getElementById("search");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const progressHandle = document.getElementById("progress-handle");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isDragging = false;

/* -------------------------
   BUILD PLAYLIST SIDEBAR
--------------------------*/
tracks.forEach((t, i) => {
  const div = document.createElement("div");

  div.className = "track";
  div.innerText = t.name;

  div.onclick = () => playTrack(i);

  div.id = "track-" + i;

  playlistDiv.appendChild(div);
});

/* -------------------------
   PLAYER CONTROLS
--------------------------*/
function playTrack(i) {
  current = i;

  audio.src = tracks[i].file;

  title.innerText = tracks[i].name;

  // retire ancienne sélection
  document.querySelectorAll(".track").forEach(track => {
    track.classList.remove("active");
  });

  // sélection active
  const activeTrack = document.getElementById("track-" + i);

  activeTrack.classList.add("active");

  // scroll automatique
  activeTrack.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  audio.play();
}

function playPause() {
  if (!audio.src) {
    playTrack(current);
    return;
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  current = (current + 1) % tracks.length;
  playTrack(current);
}

function prevTrack() {
  current = (current - 1 + tracks.length) % tracks.length;
  playTrack(current);
}

function skip(seconds) {

  audio.currentTime += seconds;

  // sécurité
  if (audio.currentTime < 0) {
    audio.currentTime = 0;
  }

  if (audio.currentTime > audio.duration) {
    audio.currentTime = audio.duration;
  }
}

audio.addEventListener("ended", () => {

  if (repeatMode) {

    audio.currentTime = 0;
    audio.play();

  } else {

    nextTrack();

  }

});

function toggleRepeat() {

  repeatMode = !repeatMode;

  const btn = document.getElementById("repeat-btn");

  if (repeatMode) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

/* -------------------------
   PLAYLIST DURATION
--------------------------*/
function calculatePlaylistDuration() {
  let totalSeconds = 0;

  tracks.forEach(track => {
    const [min, sec] = track.duration.split(":").map(Number);
    totalSeconds += min * 60 + sec;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let text = "";
  if (hours > 0) text += hours + " h ";
  text += minutes + " min";

  document.getElementById("playlist-duration").innerText = text;
}

calculatePlaylistDuration();

/* -------------------------
   PROGRESS BAR
--------------------------*/
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (isDragging || !audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  progressBar.style.width = percent + "%";
  progressHandle.style.left = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

/* -------------------------
   SEEK + DRAG
--------------------------*/
progressContainer.addEventListener("click", seek);

progressHandle.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", drag);

function seek(e) {
  const rect = progressContainer.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  audio.currentTime = percent * audio.duration;
}

function drag(e) {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;

  percent = Math.max(0, Math.min(1, percent));

  progressBar.style.width = percent * 100 + "%";
  progressHandle.style.left = percent * 100 + "%";

  audio.currentTime = percent * audio.duration;
}

/* -------------------------
   MOBILE TOUCH SUPPORT
--------------------------*/
progressHandle.addEventListener("touchstart", () => {
  isDragging = true;
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  const rect = progressContainer.getBoundingClientRect();

  let percent = (touch.clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));

  progressBar.style.width = percent * 100 + "%";
  progressHandle.style.left = percent * 100 + "%";

  audio.currentTime = percent * audio.duration;
});

searchInput.addEventListener("keyup", filterTracks);

function filterTracks() {

  const value = searchInput.value.toLowerCase();

  const tracksElements = document.querySelectorAll(".track");

  tracksElements.forEach(track => {

    const text = track.textContent.toLowerCase();

    if (text.indexOf(value) > -1) {
      track.style.display = "";
    } else {
      track.style.display = "none";
    }

  });

}

function toggleFullscreen() {

  const container = document.querySelector(".container");

  if (!document.fullscreenElement) {

    container.requestFullscreen();

  } else {

    document.exitFullscreen();

  }
}
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// resize canvas
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function draw() {

  requestAnimationFrame(draw);

  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLength;

  // 🔊 calcul énergie globale
  let energy = 0;

  for (let i = 0; i < bufferLength; i++) {
    energy += dataArray[i];
  }

  energy = energy / bufferLength;

  // 🎨 couleur selon énergie
  let color = "#C00000"; // 🟢 vert doux

  if (energy > 170) {
    color = "#ff3b3b"; // 🔴 rouge
  } else if (energy > 100) {
    color = "#ffb300"; // 🟠 orange
  }

  // 🎵 dessin des barres
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {

    const barHeight = dataArray[i] / 2;

    ctx.fillStyle = color;

    ctx.fillRect(
      x,
      canvas.height - barHeight,
      barWidth - 2,
      barHeight
    );

    x += barWidth;
  }
}

draw();

document.addEventListener("click", () => {
  audioCtx.resume();
}, { once: true });
