// =====================================
// ヘダラヌマスター
// app.js
// Version 0.2
// =====================================

// ---------------------
// 画面取得
// ---------------------
const weakModeCheck =
document.getElementById(
    "weakModeCheck"
);
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const listScreen = document.getElementById("listScreen");
const settingScreen = document.getElementById("settingScreen");
const pauseScreen = document.getElementById("pauseScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const setting =

loadSettings();

setDifficulty(

    setting.difficulty

);

setWeakMode(

    setting.weakMode

);

morseSpeed =

    setting.morseSpeed;
// ---------------------
// ボタン取得
// ---------------------

const kanaModeBtn =
    document.getElementById(
        "kanaModeBtn"
    );

const morseModeBtn =
    document.getElementById(
        "morseModeBtn"
    );

const randomModeBtn =
    document.getElementById(
        "randomModeBtn"
    );
const listBtn = document.getElementById("listBtn");
const settingBtn = document.getElementById("settingBtn");

const listBackBtn = document.getElementById("listBackBtn");
const settingBackBtn = document.getElementById("settingBackBtn");

const continueBtn = document.getElementById("continueBtn");
const titleReturnBtn = document.getElementById("titleReturnBtn");

const retryBtn = document.getElementById("retryBtn");
const backTitleBtn = document.getElementById("backTitleBtn");
const morseRadio =

document.querySelector(

`input[name="morseSpeed"][value="${morseSpeed}"]`

);

if(morseRadio){

    morseRadio.checked = true;

}

// ---------------------
// 画面一覧
// ---------------------

const screens = [
    titleScreen,
    gameScreen,
    listScreen,
    settingScreen,
    pauseScreen,
    gameOverScreen
];

// ---------------------
// 画面切替
// ---------------------

function showScreen(screen) {

    if (!screen) return;

    screens.forEach(s => {

        if (s) {
            s.classList.add("hidden");
        }

    });

    screen.classList.remove("hidden");

}

// ---------------------
// ボタンイベント
// ---------------------
continueBtn.addEventListener(

    "click",

    continueGame

);

titleReturnBtn.addEventListener(

    "click",

    returnTitle

);
// ---------------------
// 文字→信号
// ---------------------

if(kanaModeBtn){

    kanaModeBtn.addEventListener("click",()=>{

        setGameMode("kana");

        startGame();

        showScreen(gameScreen);

    });

}

// ---------------------
// 信号→文字
// ---------------------

if(morseModeBtn){

    morseModeBtn.addEventListener("click",()=>{

        setGameMode("morse");

        startGame();

        showScreen(gameScreen);

    });

}

// ---------------------
// ランダム
// ---------------------

if(randomModeBtn){

    randomModeBtn.addEventListener("click",()=>{

        setGameMode("random");

        startGame();

        showScreen(gameScreen);

    });

}

if (listBtn) {

    listBtn.addEventListener("click", () => {

        showScreen(listScreen);

updateWeakRanking();

    });

}

if (settingBtn) {

    settingBtn.addEventListener("click", () => {

        showScreen(settingScreen);

    });

}

if (listBackBtn) {

    listBackBtn.addEventListener("click", () => {

        showScreen(titleScreen);

    });

}

if (settingBackBtn) {

    settingBackBtn.addEventListener("click", () => {

        showScreen(titleScreen);

    });

}

if (continueBtn) {

}

if (retryBtn) {

    retryBtn.addEventListener("click", () => {

        retryGame();

    });

}

if (backTitleBtn) {

    backTitleBtn.addEventListener("click", () => {

        showScreen(titleScreen);

    });

}

// ---------------------
// 初期画面
// ---------------------

showScreen(titleScreen);

if(weakModeCheck){

    weakModeCheck.addEventListener(

        "change",

        ()=>{

            setWeakMode(

    weakModeCheck.checked

);

const s =

loadSettings();

saveSettings(s);

s.weakMode =

weakModeCheck.checked;

saveSettings(s);
        }

    );

}

document

.querySelectorAll(

'input[name="difficulty"]'

)

.forEach(radio=>{

    radio.addEventListener(

        "change",

        ()=>{

            setDifficulty(

    radio.value

);

const s =

loadSettings();

s.difficulty =

radio.value;

saveSettings(s);

        }

    );

});

document.addEventListener("keydown",(e)=>{

    if(e.key !== "Escape") return;

    if(isPaused){

        continueGame();

    }else{

        pauseGame();

    }

});

document

.querySelectorAll(

'input[name="morseSpeed"]'

)

.forEach(radio=>{

    radio.addEventListener(

        "change",

        ()=>{

            morseSpeed =
                radio.value;

            const s =
                loadSettings();

            s.morseSpeed =
                radio.value;

            saveSettings(s);

        }

    );

});

volume =
setting.volume / 100;

const volumeSlider =
document.getElementById(
    "volumeSlider"
);

const volumeValue =
document.getElementById(
    "volumeValue"
);

if(volumeSlider){

    volumeSlider.value =
        setting.volume;

    volumeValue.textContent =
        setting.volume + "%";

    volumeSlider.addEventListener(

        "input",

        ()=>{

            volume =
                volumeSlider.value / 100;

            volumeValue.textContent =
                volumeSlider.value + "%";

            const s =
                loadSettings();

            s.volume =
                Number(volumeSlider.value);

            saveSettings(s);

        }

    );

}

drawTree();