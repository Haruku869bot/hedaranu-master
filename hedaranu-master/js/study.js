// =====================================
// study.js
// =====================================
let studyList = MORSE_DATA;

const studyGroup =
    document.getElementById("studyGroup");

let studyIndex = 0;

const studyScreen =
    document.getElementById("studyScreen");

const studyKana =
    document.getElementById("studyKana");

const studyCode =
    document.getElementById("studyCode");

const studyHint =
    document.getElementById("studyHint");

const studyPlayBtn =
    document.getElementById("studyPlayBtn");

const studyPrevBtn =
    document.getElementById("studyPrevBtn");

const studyNextBtn =
    document.getElementById("studyNextBtn");

const studyBackBtn =
    document.getElementById("studyBackBtn");

const studyBtn =
    document.getElementById("studyBtn");

// -------------------------------------

function updateStudy(){

    const item =
    studyList[studyIndex];

    studyKana.textContent =
        item.kana;

    studyCode.textContent =
        item.code;

    studyHint.textContent =
        item.hint;

}

// -------------------------------------

if(studyBtn){

    studyBtn.addEventListener("click",()=>{

        studyIndex = 0;

        updateStudy();

        showScreen(studyScreen);

    });

}

// -------------------------------------

studyNextBtn.addEventListener("click",()=>{

    studyIndex++;

    if(studyIndex >= studyList.length){

        studyIndex = 0;

    }

    updateStudy();

});

// -------------------------------------

studyPrevBtn.addEventListener("click",()=>{

    studyIndex--;

    if(studyIndex < 0){

        studyIndex =
    studyList.length-1;

    }

    updateStudy();

});

// -------------------------------------

studyPlayBtn.addEventListener("click",()=>{

    playMorse(

        MORSE_DATA[studyIndex].code

    );

});

// -------------------------------------

studyBackBtn.addEventListener("click",()=>{

    showScreen(titleScreen);

});

studyGroup.addEventListener(

    "change",

    ()=>{

        if(studyGroup.value==="all"){

            studyList = MORSE_DATA;

        }

        else{

            studyList =

                getQuestionsByGroup(

                    studyGroup.value

                );

        }

        studyIndex = 0;

        updateStudy();

    }

);