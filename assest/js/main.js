let keyboard = document.querySelector(".keyboard");
let worddisplay = document.querySelector(".word-display");
let guessestext = document.querySelector(".guesses-text b");
let gamemodel = document.querySelector(".game-model");
let playagain = document.querySelector(".play-again");
let hangmanimg = document.querySelector(".hangman-box img");

for (let i = 97; i<=122; i++) { 
    const btn = document.createElement("button");
    btn.innerHTML = String.fromCharCode(i);
    keyboard.appendChild(btn);
    btn.addEventListener("click", (e) => initletter(e.target,String.fromCharCode(i)));
    
}
///////////////////////////////////////////////////

/////////////////////////////////////////////////////////
let currentword,correct=[],wrongguess=0,max=6;
const getrandom = ()=>{
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    const hintb = document.querySelector(".hint-text b");
    currentword = word;
    resetgame();
    hintb.innerHTML = hint;
    worddisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
    console.log(word);
}
const resetgame = () => {
    correct = [], wrongguess = 0, max = 6;
    worddisplay.innerHTML = currentword.split("").map(() => `<li class="letter"></li>`).join("");
    hangmanimg.src = `assest/images/hangman-${wrongguess}.svg`;
    guessestext.innerText = `${wrongguess} / ${max}`;
    gamemodel.classList.remove("show");
    keyboard.querySelectorAll("button").forEach((el) => el.disabled = false);
}
getrandom();
playagain.addEventListener("click", getrandom);
////////////////////////////////////////////////////////////
const initletter = (btn, letterclicked) => {
    if (currentword.includes(letterclicked)) {
        [...currentword].forEach((letter, index) => {
            if (letter === letterclicked) {
                worddisplay.querySelectorAll("li")[index].innerText= letter;
                worddisplay.querySelectorAll("li")[index].classList.add("guessed");
                correct.push(letter);
            }
        })
    } else {
        wrongguess++;
        hangmanimg.src = `assest/images/hangman-${wrongguess}.svg`;
    }
    btn.disabled = true;
    guessestext.innerText = `${wrongguess} / ${max}`;
    if (wrongguess === max) gameover(false);
    if (correct.length === currentword.length) gameover(true);
};
//////////////////////////////////////////////
let gameover=(istrue)=>{
    setTimeout(() => {
        const modal = istrue ? `you found the word :` : `The correct word was: `;
        gamemodel.querySelector("img").src = `assest/images/${istrue ? `victory` : `lost`}.gif`;
        gamemodel.querySelector("h4").innerHTML = `${istrue ? "congratulation!" : "game over!"}`;
        gamemodel.querySelector("p").innerHTML = `${modal} <b>${currentword}</b>`;
        gamemodel.classList.add("show");
    },300)
}
// //////////////////////////////////
