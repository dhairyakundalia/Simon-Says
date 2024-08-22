let h3 = document.querySelector("h3");
let highscore = document.querySelector(".highscore");
let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let btns = document.querySelectorAll(".btn");
// let score = 0;
let HScore = 0;
let body = document.querySelector("body");

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;

    let random = Math.floor(Math.random() * 4);
    let btn = btns[random];
    gameSeq.push(btn);
    console.log(gameSeq);
    setTimeout(function () {
        gameFlash(btn);
    }, 700);
    userSeq = [];
}

document.addEventListener("keypress", function () {
    if (start == false) {
        start = true;
        levelUp();
    }
});

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}

function check() {
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] != gameSeq[i]) {
            body.style.backgroundColor = "red";
            setTimeout(function () {
                body.style.backgroundColor = "white";
            }, 250);
            if (HScore < level - 1) {
                HScore = level - 1;
                h3.innerHTML = `Game Over! Your score was ${level - 1}.<br>That's a new Highscore!<br><br>Press any key to start.`
                highscore.innerText = `Highscore: ${HScore}`;
            }
            else {
                h3.innerHTML = `Game Over! Your score was ${level - 1}.<br><br>Press any key to start.`
            }

            reset();
        }
        else if (i == level - 1) {
            levelUp();
        }
    }
}

function btnClick(btn) {
    userSeq.push(btn);
    console.log(userSeq);
    userFlash(btn);
    check();
}

for (let btn of btns) {
    btn.addEventListener("click", function (event) {
        if (start == true) {
            btnClick(event.target);
        }
        // btnClick(event.target);
    })
}