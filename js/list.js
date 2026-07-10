// =====================================
// LIST表示
// =====================================

const listContainer =
    document.getElementById(
        "listContainer"
    );

const weakRanking =
    document.getElementById(
        "weakRanking"
    );

function createList(){

    if(!listContainer) return;

    listContainer.innerHTML = "";

    MORSE_DATA.forEach(item=>{

        const div =
            document.createElement("div");

        div.className = "listItem";

        div.innerHTML = `
            <b>${item.kana}</b>
            ${item.code}
            <button class="playBtn">▶</button>
        `;

        div
            .querySelector(".playBtn")
            .onclick = ()=>{

                if(typeof playMorse === "function"){

                    playMorse(item.code);

                }

            };

        listContainer.appendChild(div);

    });

}

function updateWeakRanking(){

    if(!weakRanking) return;

    const weakList=

        JSON.parse(

            localStorage.getItem(

                "weakList"

            )

        ) || {};

    const ranking=

        Object.entries(weakList)

        .sort(

            (a,b)=>b[1]-a[1]

        );

    if(ranking.length===0){

        weakRanking.textContent=

        "苦手文字はありません";

        return;

    }

    weakRanking.innerHTML="";

    ranking.forEach(

        ([kana,count],index)=>{

            const p=

            document.createElement("p");

            p.textContent =
`${index + 1}位　${kana}　${count}回`;

            weakRanking.appendChild(p);

        }

    );

}

createList();

updateWeakRanking();