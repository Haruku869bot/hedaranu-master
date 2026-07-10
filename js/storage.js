// =====================================
// storage.js
// =====================================

const STORAGE_KEY = "hedaranu_setting";

// -----------------------------

function loadSettings(){

    const data = JSON.parse(

        localStorage.getItem(

            STORAGE_KEY

        )

    );

    if(!data){

    return{

        difficulty:"normal",

        weakMode:false,

        morseSpeed:"normal",

        volume:20

    };

}

    return data;

}

// -----------------------------

function saveSettings(setting){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(setting)

    );

}
