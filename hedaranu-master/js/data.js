// =====================================
// ヘダラヌマスター
// data.js
// Version 1.1
// =====================================

const MORSE_DATA = [

    // ア行
    { kana: "ア", code: "ーー・ーー", level: 1, group: "ア行", hint: "ムーヨーリネーアー" },
    { kana: "イ", code: "・ー", level: 1, group: "ア行", hint: "ヘイー" },
    { kana: "ウ", code: "・・ー", level: 1, group: "ア行", hint: "ヘダウー" },
    { kana: "エ", code: "ー・ーーー", level: 1, group: "ア行", hint: "ムータワーケーエー" },
    { kana: "オ", code: "・ー・・・", level: 1, group: "ア行", hint: "ヘイーナカオ" },

    // カ行
    { kana: "カ", code: "・ー・・", level: 1, group: "カ行", hint: "ヘイーナカ" },
    { kana: "キ", code: "ー・ー・・", level: 1, group: "カ行", hint: "ムータワーニキ" },
    { kana: "ク", code: "・・・ー", level: 1, group: "カ行", hint: "ヘダラクー" },
    { kana: "ケ", code: "ー・ーー", level: 1, group: "カ行", hint: "ムータワーケー" },
    { kana: "コ", code: "ーーーー", level: 1, group: "カ行", hint: "ムーヨーレーコー" },

    // サ行
    { kana: "サ", code: "ー・ー・ー", level: 1, group: "サ行", hint: "ムータワーニサー" },
    { kana: "シ", code: "ーー・ー・", level: 1, group: "サ行", hint: "ムーヨーリネーシ" },
    { kana: "ス", code: "ーーー・ー", level: 1, group: "サ行", hint: "ムーヨーレーソスー" },
    { kana: "セ", code: "・ーーー・", level: 1, group: "サ行", hint: "ヘイーヤーヲーセ" },
    { kana: "ソ", code: "ーーー・", level: 1, group: "サ行", hint: "ムーヨーレーソ" },

    // タ行
    { kana: "タ", code: "ー・", level: 1, group: "タ行", hint: "ムータ" },
    { kana: "チ", code: "・・ー・", level: 1, group: "タ行", hint: "ヘダウーチ" },
    { kana: "ツ", code: "・ーー・", level: 1, group: "タ行", hint: "ヘイーヤーツ" },
    { kana: "テ", code: "・ー・ーー", level: 1, group: "タ行", hint: "ヘイーナローテー" },
    { kana: "ト", code: "・・ー・・", level: 1, group: "タ行", hint: "ヘダウーチト" },

    // ナ行
    { kana: "ナ", code: "・ー・", level: 1, group: "ナ行", hint: "ヘイーナ" },
    { kana: "ニ", code: "ー・ー・", level: 1, group: "ナ行", hint: "ムータワーニ" },
    { kana: "ヌ", code: "・・・・", level: 1, group: "ナ行", hint: "ヘダラヌ" },
    { kana: "ネ", code: "ーー・ー", level: 1, group: "ナ行", hint: "ムーヨーリネー" },
    { kana: "ノ", code: "・・ーー", level: 1, group: "ナ行", hint: "ヘダウーノー" },

    // ハ行
    { kana: "ハ", code: "ー・・・", level: 1, group: "ハ行", hint: "ムータホハ" },
    { kana: "ヒ", code: "ーー・・ー", level: 1, group: "ハ行", hint: "ムーヨーリフヒー" },
    { kana: "フ", code: "ーー・・", level: 1, group: "ハ行", hint: "ムーヨーリフ" },
    { kana: "ヘ", code: "・", level: 1, group: "ハ行", hint: "ヘ" },
    { kana: "ホ", code: "ー・・", level: 1, group: "ハ行", hint: "ムータホ" },

    // マ行
    { kana: "マ", code: "ー・・ー", level: 1, group: "マ行", hint: "ムータホマー" },
    { kana: "ミ", code: "・・ー・ー", level: 1, group: "マ行", hint: "ヘダウーチミー" },
    { kana: "ム", code: "ー", level: 1, group: "マ行", hint: "ムー" },
    { kana: "メ", code: "ー・・・ー", level: 1, group: "マ行", hint: "ムータホハメー" },
    { kana: "モ", code: "ー・・ー・", level: 1, group: "マ行", hint: "ムータホマーモ" },

    // ヤ行
    { kana: "ヤ", code: "・ーー", level: 1, group: "ヤ行", hint: "ヘイーヤー" },
    { kana: "ユ", code: "ー・・ーー", level: 1, group: "ヤ行", hint: "ムータホマーユー" },
    { kana: "ヨ", code: "ーー", level: 1, group: "ヤ行", hint: "ムーヨー" },

    // ラ行
    { kana: "ラ", code: "・・・", level: 1, group: "ラ行", hint: "ヘダラ" },
    { kana: "リ", code: "ーー・", level: 1, group: "ラ行", hint: "ムーヨーリ" },
    { kana: "ル", code: "ー・ーー・", level: 1, group: "ラ行", hint: "ムータワーケール" },
    { kana: "レ", code: "ーーー", level: 1, group: "ラ行", hint: "ムーヨーレー" },
    { kana: "ロ", code: "・ー・ー", level: 1, group: "ラ行", hint: "ヘイーナロー" },

    // ワ行
    { kana: "ワ", code: "ー・ー", level: 1, group: "ワ行", hint: "ムータワー" },
    { kana: "ヰ", code: "・ー・・ー", level: 1, group: "ワ行", hint: "ヘイーナカヰー" },
    { kana: "ヱ", code: "・ーー・・", level: 1, group: "ワ行", hint: "ヘイーヤーツヱ" },
    { kana: "ヲ", code: "・ーーー", level: 1, group: "ワ行", hint: "ヘイーヤーヲー" },
    { kana: "ン", code: "・ー・ー・", level: 1, group: "ワ行", hint: "ヘイーナローン" }

];

// ランダム問題
function getRandomQuestion(level = 99){

    const list = getQuestionsByLevel(level);

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ];

}

// かな検索
function findByKana(kana) {
    return MORSE_DATA.find(item => item.kana === kana);
}

// 信号検索
function findByCode(code) {
    return MORSE_DATA.find(item => item.code === code);
}

// レベルごとの問題取得
function getQuestionsByLevel(level) {
    return MORSE_DATA.filter(item => item.level <= level);
}

// 行ごとの問題取得
function getQuestionsByGroup(group) {
    return MORSE_DATA.filter(item => item.group === group);
}