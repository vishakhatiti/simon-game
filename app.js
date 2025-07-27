let gameSeq = [];
let userSeq = [];
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("high-score").innerText = `High Score: ${highScore}`;

let btns = ["red", "yellow", "green", "purple"];
let sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  wrong: new Audio("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
};

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let emojiToggle = document.querySelector(".emoji-toggle");

function playSound(color) {
  sounds[color].play();
}

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);

  setTimeout(() => gameFlash(randBtn), 500);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => levelUp(), 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("error");
    setTimeout(() => document.body.classList.remove("error"), 150);
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      document.getElementById("high-score").innerText = `High Score: ⭐ ${highScore}`;

    }
    h2.innerHTML = `Game over \u{1F622}! Your score: <b>${level}</b><br>Press any key to restart\u{1F389}.`;
    reset();
  }
}

function btnPress() {
  if (!started) return;
  let btn = this;
  userflash(btn);
  let userColor = btn.id;
  userSeq.push(userColor);
  playSound(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

if (emojiToggle) {
  emojiToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    emojiToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "	🌞";
  });
}
