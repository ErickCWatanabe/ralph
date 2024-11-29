const state={
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        lives:document.querySelector("#lives")
    },
    values:{
       timerId:null,
       gameVelocity:1000,
       hitPosition:0,
       scorePoint:0,
        left:20,
        life:3
    },
    action:{
        tempo:null,
        timer:null,
        check:null,
        missH:null
    }
};
function adicionaEnemy() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let random= Math.floor(Math.random()*9)
    let randomSquare= state.view.squares[random];
    randomSquare.classList.add("enemy")
    state.values.hitPosition=randomSquare.id;
    tocaSound("ap");
}
function moveEnemy() {
    state.values.timerId=setInterval((adicionaEnemy),state.values.gameVelocity);
    
}

function addHitbox(){
 state.view.squares.forEach((square)=>{
   square.addEventListener("mousedown",()=>{
    if (square.id===state.values.hitPosition) {
        state.values.scorePoint++
        state.view.score.textContent=state.values.scorePoint
        state.values.hitPosition=null
        playSound("osu-hit-sound")
    }
   })
 })

}
function diminuiTempo() {
    state.view.timeLeft.textContent=state.values.left
    state.action.timer = setInterval(()=>{
        state.values.left--
        state.view.timeLeft.textContent=state.values.left
    },1000)
}
function playSound(audioName) {
    let audio = new Audio(`./assets/soundEffect/${audioName}.mp3`);
    audio.volume = 1.0;
    audio.play();
  }
  function tocaSound(audioName) {
    let audio = new Audio(`./assets/soundEffect/${audioName}.mp3`);
    audio.volume = 0.5;
    audio.play();
  }

function perderVida() {
    state.view.lives.textContent=state.values.life
   state.action.tempo=setInterval(()=>{
    if (state.values.left<=0) {
        state.values.life--
        state.view.lives.textContent=state.values.life
        state.values.left=20
        playSound("floweyhitsound")
    }

   })
}
function gameOver() {
    const test = setInterval(() => {
       
        if (state.values.life === 0) { 
            playSound("death")
            clearInterval(state.action.timer);
            clearInterval(state.values.timerId); 
            clearInterval(state.action.tempo);
            alert(`Your score: ${state.values.scorePoint}`);
            state.view.timeLeft.textContent=0
           clearInterval(test);
           
        }
    }, 1000);  
}
function lowhealth() {    
    check=setInterval(() =>{
    if (state.values.life===1) {
    playSound("health")
    playSound("low-health-bot-ng")
    clearInterval(check)
}},1000)
    
}
function miss() {    
    missH=setInterval(() =>{
 
    playSound("hit-or-miss")
    clearInterval(missH)
},1000)}

function main(){
    miss();
    addHitbox();
    moveEnemy();
    diminuiTempo();
    perderVida();
    lowhealth();
    gameOver();
}
main();
