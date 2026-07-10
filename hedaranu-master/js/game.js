// =====================================
// ヘダラヌマスター
// game.js
// Version 0.1
// 前半
// =====================================

// =====================================
// DOM取得
// =====================================
const highScoreText =
document.getElementById("highScore");

const expGauge =
document.getElementById(
    "expGauge"
);
const kanaButtons =
    document.getElementById(
        "kanaButtons"
    );
const treeText =
    document.getElementById(
        "treeText"
    );    
const question = document.getElementById("question");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const lifeArea = document.getElementById("lifeArea");
const playerInput = document.getElementById("playerInput");
const effectArea = document.getElementById("effectArea");
const modeArea =
document.getElementById(
    "modeArea"
);

const dotBtn = document.getElementById("dotBtn");
const dashBtn = document.getElementById("dashBtn");
const enterBtn = document.getElementById("enterBtn");

// =====================================
// 定数
// =====================================

const GAME = {

    scorePerQuestion:100,

    levelUpScore:1000,

    startLife:3,

    startSpeed:0.6,

    speedUpPerLevel:0.03,

    deadlineY:650

};

// =====================================
// 直前の問題
// =====================================

let previousQuestion = null;

// =====================================
// ハイスコア
// =====================================

let highScore =
    Number(
        localStorage.getItem("highScore")
    ) || 0;

// =====================================
// 状態
// =====================================

let isPaused = false;

let score = 0;

let level = 1;

let life = 3;

let speed = GAME.startSpeed;

let currentQuestion = null;

let answer = "";

let input = "";

let fallY = 30;

let playing = false;

let mode = "kana";

let correctCount = 0;

let missCount = 0;

let questionCount = 0;

let startTime = 0;

let exp = 0;

const EXP_PER_LEVEL = 100;

let morseSpeed = "normal";

let volume = 0.2;

const MORSE_SPEED = {

    slow:{

        dot:200,

        dash:500,

        gap:180

    },

    normal:{

        dot:100,

        dash:300,

        gap:100

    },

    fast:{

        dot:60,

        dash:180,

        gap:60

    }

};

// =====================================
// 難易度
// =====================================

let difficulty = "normal";

const DIFFICULTY = {

    easy:{

        speed:0.8,

        score:0.8

    },

    normal:{

        speed:1.0,

        score:1.0

    },

    hard:{

        speed:1.3,

        score:1.3

    }

};
// =====================================
// 苦手文字管理
// =====================================

let weakList =
    JSON.parse(
        localStorage.getItem("weakList")
    ) || {};

let weakMode = false;

// =====================================
// 開始
// =====================================

function startGame() {

    const newHighScore =
      document.getElementById(
        "newHighScore"
      );

    if(newHighScore){

      newHighScore.classList.add(
        "hidden"
      );

    }

    exp = 0;

    correctCount = 0;

    missCount = 0;

    questionCount = 0;

    startTime = Date.now();

    score = 0;

    level = 1;

    life = GAME.startLife;

    speed =
GAME.startSpeed *
DIFFICULTY[difficulty].speed;

    input = "";

    playing = true;

    lastTime = 0;

    isPaused = false;

    updateUI();

    if(highScoreText){

    highScoreText.textContent =
        "HI SCORE " +
        highScore.toString().padStart(6,"0");

}

    nextQuestion();

    requestAnimationFrame(gameLoop);

}

// =====================================
// 苦手文字保存
// =====================================

function saveWeakList(){

    localStorage.setItem(

        "weakList",

        JSON.stringify(weakList)

    );

}

function addWeakQuestion(kana){

    if(!weakList[kana]){

        weakList[kana]=1;

    }else{

        weakList[kana]++;

    }

    saveWeakList();

}

function removeWeakQuestion(kana){

    if(!weakList[kana]) return;

    weakList[kana]--;

    if(weakList[kana]<=0){

        delete weakList[kana];

    }

    saveWeakList();

}
// =====================================
// 次の問題
// =====================================

function nextQuestion(){

    if(weakMode){

    const weakKana =
        Object.keys(weakList);

    if(weakKana.length>0){

        const kana =
            weakKana[
                Math.floor(
                    Math.random()*weakKana.length
                )
            ];

        currentQuestion =
            findByKana(kana);

    }else{

        let next;

do{

    next = getRandomQuestion();

}while(

    previousQuestion &&

    next.kana === previousQuestion.kana

);

currentQuestion = next;

previousQuestion = currentQuestion;

    }

}else{

    let next;

    do{

        next = getRandomQuestion();

    }while(

        previousQuestion &&

        next.kana === previousQuestion.kana

    );

    currentQuestion = next;

    previousQuestion = currentQuestion;

}

    input = "";

    playerInput.textContent = "";

    fallY = 30;

    question.style.top = "30px";
    question.style.opacity = "1";
question.style.transform = "";
question.style.display = "block";

    switch(mode){

        
        case "kana":

            modeArea.textContent =
           "文字 → 信号";

            question.textContent =
                currentQuestion.kana;

                updateTree(currentQuestion.code);

                setTimeout(()=>{


}, currentQuestion.code.length*180);

            answer =
                currentQuestion.code;

            kanaButtons.classList.add(
                "hidden"
            );

            dotBtn.classList.remove(
                "hidden"
            );

            dashBtn.classList.remove(
                "hidden"
            );

            break;

        case "morse":

            modeArea.textContent =
             "信号 → 文字";

            question.textContent =
                currentQuestion.code;

            answer =
                currentQuestion.kana;

            kanaButtons.classList.remove(
                "hidden"
            );

            dotBtn.classList.add(
                "hidden"
            );

            dashBtn.classList.add(
                "hidden"
            );

            break;

        case "random":

             modeArea.textContent =
             "ランダム";


            if(Math.random()<0.5){

                question.textContent =
                    currentQuestion.kana;

                answer =
                    currentQuestion.code;

                kanaButtons.classList.add(
                    "hidden"
                );

                dotBtn.classList.remove(
                    "hidden"
                );

                dashBtn.classList.remove(
                    "hidden"
                );

            }else{

                question.textContent =
                    currentQuestion.code;

                answer =
                    currentQuestion.kana;

                kanaButtons.classList.remove(
                    "hidden"
                );

                dotBtn.classList.add(
                    "hidden"
                );

                dashBtn.classList.add(
                    "hidden"
                );

            }

            break;

    }


  // モールス音再生
if(typeof playMorse === "function"){

    if(mode === "kana"){

        playMorse(answer);

    }else{

        playMorse(currentQuestion.code);

    }

}

}

// =====================================
// UI
// =====================================

function updateUI(){

    scoreText.textContent =
        score
        .toString()
        .padStart(6,"0");

    levelText.textContent =
        level;

    lifeArea.textContent =
        "❤️".repeat(life) +
        "🤍".repeat(
            GAME.startLife-life
        );

    const highScoreText =
        document.getElementById(
            "highScore"
        );

    if(highScoreText){

        highScoreText.textContent =
            "HI SCORE " +
            highScore
            .toString()
            .padStart(6,"0");

    }

   if(expGauge){

    expGauge.style.width =
        (exp / EXP_PER_LEVEL * 100) + "%";

}

}

// =====================================
// ループ
// =====================================

function gameLoop(timestamp){

    if(!playing) return;

    if(lastTime===0){

        lastTime = timestamp;

    }

    const deltaTime =

        (timestamp-lastTime)

        /1000;

    lastTime = timestamp;

    fallY +=

        speed

        *120

        *deltaTime;

    question.style.top =
fallY + "px";

question.style.transform =

`translateX(${
Math.sin(fallY/25)*6
}px)
scale(${
1+fallY/1200
})
rotate(${
Math.sin(fallY/40)*4
}deg)`;

if(fallY >= GAME.deadlineY){

    missQuestion();

}

requestAnimationFrame(gameLoop);

}

// =====================================
// 入力
// =====================================

function addInput(symbol){

    if(!playing) return;

    input += symbol;

    playerInput.textContent =
        input;

}

function removeInput(){

    input =
        input.slice(0,-1);

    playerInput.textContent =
        input;

}

function clearInput(){

    input="";

    playerInput.textContent="";

}
// =====================================
// 判定
// =====================================

function checkAnswer(){

    if(!playing) return;

    if(input === answer){

        correctQuestion();

    }else{

        missQuestion();

    }

}

// =====================================
// 正解
// =====================================

function correctQuestion(){

    if(!playing) return;

    playing = false;

    correctCount++;
    questionCount++;

    removeWeakQuestion(currentQuestion.kana);

    score += Math.floor(
        GAME.scorePerQuestion *
        DIFFICULTY[difficulty].score
    );

    exp += 20;

    if(exp >= EXP_PER_LEVEL){

        exp = 0;

        level++;

        speed =
        (
            GAME.startSpeed +
            (level-1) *
            GAME.speedUpPerLevel
        ) *
        DIFFICULTY[difficulty].speed;

        showEffect(
            "LEVEL " + level,
            "levelup"
        );
    }

    updateUI();

    showEffect(
        "+100",
        "correct"
    );

    // 木を光らせる
    if(typeof highlightPath === "function"){

        highlightPath(currentQuestion.code);

    }

    // 正解演出
    question.animate(
        [
            {
                transform:"scale(1)",
                opacity:1
            },
            {
                transform:"scale(1.4)",
                opacity:0
            }
        ],
        {
            duration:250,
            fill:"forwards"
        }
    );

    setTimeout(()=>{

        // 表示を初期化
        question.getAnimations().forEach(a=>a.cancel());

        question.style.opacity="1";
        question.style.transform="";
        question.style.top="30px";

        // 次の問題
        nextQuestion();

        // ゲーム再開
        playing = true;
        lastTime = 0;
        requestAnimationFrame(gameLoop);

    },300);

}
// =====================================
// ミス
// =====================================

function missQuestion(){

    question.animate(

[

{

transform:

"translateX(0)",

color:"#fff"

},

{

transform:

"translateX(-12px)",

color:"red"

},

{

transform:

"translateX(12px)",

color:"red"

},

{

transform:

"translateX(0)",

color:"#fff"

}

],

{

duration:300

}

);


    missCount++;

questionCount++;
    addWeakQuestion(

    currentQuestion.kana

);

    showEffect(

    "MISS!",

    "miss"

    );

    life--;

    updateUI();

    if(life <= 0){

        gameOver();

        document

.querySelectorAll(".treeNode")

.forEach(node=>{

    node.classList.remove("active");

});

        return;

    }

    nextQuestion();

}

// =====================================
// GAME OVER
// =====================================

function gameOver(){

    playing = false;

    let isNewRecord = false;

    if(score > highScore){

        highScore = score;

        localStorage.setItem(
            "highScore",
            highScore
        );

        isNewRecord = true;

    }

    updateUI();

    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const finalLevel =
        document.getElementById(
            "finalLevel"
        );
    const accuracyText =
document.getElementById(
"accuracyText"
);

const questionCountText =
document.getElementById(
"questionCountText"
);

const correctCountText =
document.getElementById(
"correctCountText"
);

const missCountText =
document.getElementById(
"missCountText"
);

const playTimeText =
document.getElementById(
"playTimeText"
);    

    const newHighScore =
        document.getElementById(
            "newHighScore"
        );

    if(finalScore){

        finalScore.textContent =
            "SCORE " +
            score
            .toString()
            .padStart(6,"0");

    }

    if(finalLevel){

        finalLevel.textContent =
            "LEVEL " + level;

    }

    if(newHighScore){

        if(isNewRecord){

            newHighScore.classList.remove(
                "hidden"
            );

        }else{

            newHighScore.classList.add(
                "hidden"
            );

        }

    }

    showScreen(
        gameOverScreen
    );

    const accuracy =

questionCount===0

?100

:Math.round(

correctCount/

questionCount

*100

);

const playTime =

Math.floor(

(Date.now()-startTime)

/1000

);

const minute =

String(

Math.floor(playTime/60)

).padStart(2,"0");

const second =

String(

playTime%60

).padStart(2,"0");

if(accuracyText){

    accuracyText.textContent =
        "正答率 " + accuracy + "%";

}

if(questionCountText){

    questionCountText.textContent =
        "問題数 " + questionCount;

}

if(correctCountText){

    correctCountText.textContent =
        "正解 " + correctCount;

}

if(missCountText){

    missCountText.textContent =
        "ミス " + missCount;

}

if(playTimeText){

    playTimeText.textContent =
        "プレイ時間 " +
        minute +
        ":" +
        second;

}

if(newHighScore){

    newHighScore.animate(

        [
            {
                transform:"scale(.5)"
            },
            {
                transform:"scale(1.3)"
            },
            {
                transform:"scale(1)"
            }

        ],

        {

            duration:600

        }

    );

}

document

.querySelectorAll(".treeNode")

.forEach(node=>{

    node.classList.remove(

        "active",
        "current"

    );

});
}
// =====================================
// 苦手モード
// =====================================

function setWeakMode(flag){

    weakMode = flag;

}

// =====================================
// キーボード
// =====================================

document.addEventListener(
"keydown",(e)=>{

    if(!playing) return;

    switch(e.key){

        case "z":
        case "Z":

            addInput("・");

            break;

        case "x":
        case "X":

            addInput("ー");

            break;

        case "Enter":

            checkAnswer();

            break;

        case "Backspace":

            removeInput();

            break;

    }

});

// =====================================
// ボタン
// =====================================

dotBtn.addEventListener("click",()=>{

    addInput("・");

    if(typeof playMorse === "function"){

        playMorse("・");

    }

});

dashBtn.addEventListener("click",()=>{

    addInput("ー");

    if(typeof playMorse === "function"){

        playMorse("ー");

    }

});

enterBtn.addEventListener("click",()=>{

    checkAnswer();

});

// =====================================
// モード
// =====================================

function setGameMode(gameMode){

    mode = gameMode;

    nextQuestion();

}

// =====================================
// 停止
// =====================================

function stopGame(){

    playing = false;

}

// =====================================
// ポーズ
// =====================================

function pauseGame(){

    if(!playing) return;

    isPaused = true;

    playing = false;

    showScreen(pauseScreen);

}

// =====================================
// 再開
// =====================================

function continueGame(){

    if(!isPaused) return;

    isPaused = false;

    playing = true;

    lastTime = 0;

    showScreen(gameScreen);

    requestAnimationFrame(gameLoop);

}

// =====================================
// タイトルへ
// =====================================

function returnTitle(){

    isPaused = false;

    stopGame();

    showScreen(titleScreen);

}

// =====================================
// リトライ
// =====================================

function retryGame(){

    showScreen(gameScreen);

    startGame();

}

// =====================================
// 外部公開
// =====================================

window.startGame = startGame;

window.stopGame = stopGame;

window.pauseGame = pauseGame;

window.continueGame =
    continueGame;

window.retryGame =
    retryGame;

window.returnTitle =
    returnTitle;

window.setGameMode =
    setGameMode;

// =====================================
// 初期化
// =====================================

//=====================================
// かなボタン生成
//=====================================

function createKanaButtons(){

    if(!kanaButtons) return;

    kanaButtons.innerHTML = "";

    MORSE_DATA.forEach(item=>{

        const button =
            document.createElement("button");

        button.className = "kanaButton";

        button.textContent = item.kana;

        button.addEventListener("click",()=>{

            input = item.kana;

            playerInput.textContent = input;

        });

        kanaButtons.appendChild(button);

    });

}

createKanaButtons();

updateUI();

//=====================================
// エフェクト表示
//=====================================

function showEffect(text,className){

    if(!effectArea) return;

    effectArea.className =
        "effect " + className;

    effectArea.textContent =
        text;


    
    setTimeout(()=>{

        effectArea.className="";

        effectArea.textContent="";

    },800);

}
// =====================================
// game.js End
// =====================================
window.setWeakMode =
    setWeakMode;
function setDifficulty(mode){

    difficulty = mode;

}
window.setDifficulty =
setDifficulty;