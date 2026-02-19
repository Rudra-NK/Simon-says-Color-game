let gameseq = [];
let userseq = [];

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;
let highest = 0;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

let h3 = document.querySelector("h3");
let startBtn = document.querySelector("button");
let hint = document.querySelector("h4");

function startGame() {
    if (started == false) {
        started = true;

        setTimeout(() => {
            levelUp();
        }, 700);
    }
}
startBtn.addEventListener("click", startGame);

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
};
function userFlash(btn) {
    btn.classList.add("green");
    setTimeout(function () {
        btn.classList.remove("green");
    }, 250);
};

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    highscore();
    let randidx = Math.floor(Math.random() * 3);
    let randColor = btns[randidx];

    for (let i = 0; i < gameseq.length; i++) {
        let color = gameseq[i];
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            gameFlash(btn);
        }, i * 600);
    }

    setTimeout(() => {
        let randbtn = document.querySelector(`.${randColor}`);
        gameFlash(randbtn);
        gameseq.push(randColor);
    }, gameseq.length * 600);

};

function checkAns(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game over! Your score was ${level}\n`;
        startBtn.innerText = "Play again";
        startBtn.classList.add("red");
        hint.innerText = "Hint : Remember the color sequence";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "antiquewhite";
        }, 100);
        reset();
    }
};

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
};

for (btn of allBtns) {
    btn.addEventListener("click", btnPress)
};

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
};

function highscore() {
    if (highest < level) {
        highest = level;
        h3.innerText = `highest score : ${highest}`;
    };
};