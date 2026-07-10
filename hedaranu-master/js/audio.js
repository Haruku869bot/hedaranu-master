// =====================================
// ヘダラヌマスター
// audio.js
// =====================================

const audioContext =
    new (window.AudioContext ||
         window.webkitAudioContext)();

function beep(time){

    const osc =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();
    
        gain.gain.value = volume;

    osc.type = "sine";

    osc.frequency.value = 700;

    osc.connect(gain);

    gain.connect(
        audioContext.destination
    );

    osc.start();

    gain.gain.setValueAtTime(

0.2,

audioContext.currentTime

);

gain.gain.exponentialRampToValueAtTime(

0.001,

audioContext.currentTime + time

);

osc.stop(

audioContext.currentTime + time

);

}

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

async function playMorse(code){

    if(audioContext.state === "suspended"){

        await audioContext.resume();

    }

    const speed =
        MORSE_SPEED[morseSpeed];

    for(const c of code){

        if(c === "・"){

            beep(speed.dot / 1000);

            await sleep(speed.dot);

        }

        else if(c === "ー"){

            beep(speed.dash / 1000);

            await sleep(speed.dash);

        }

        await sleep(speed.gap);

    }

}