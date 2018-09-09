
var possibleWords = [
    "THE DOCTOR",
    "THE MASTER",
    "DALEK",
    "TARDIS",
    "CYBERMAN",
    "SONTARAN",
    "GALLIFREY",
    "ZYGON",
    "COMPANION",
    "TORCHWOOD",
    "SONIC SCREWDRIVER",
    "EXTERMINATE",
    "ROSE TYLER",
    "BAD WOLF",
    "TIME LORD",
    "BOW TIE",
    "RIVER SONG",
    "FANTASTIC",
    "ALLONS Y",
    "GERONIMO",
    "TIME VORTEX",
    "JACK HARKNESS",
    "DONNA NOBLE",
    "MARTHA JONES",
    "AMY POND",
    "RORY WILLIAMS",
    "CLARA OSWALD",
    "NARDOLE",
    "BILL POTTS",
    "THE SILENCE",
    "SLITHEEN",
    "WEEPING ANGEL"
]

var wordArray = [];
var displayWord = "";
var remainingGuesses = 15;
var lettersGuessed = "";
var wins = 0;

function newWord(){
    return possibleWords[Math.floor(Math.random() * possibleWords.length)];
}

function insertWord(word) { 

    for (let i = 0; i < word.length; i++) {
        wordArray.push(word[i]);
    }
    console.log(wordArray);

    for (let j = 0; j < wordArray.length; j++) {
        if (wordArray[j] === " ") {
            displayWord = displayWord + "  ";
        } else {
            displayWord = displayWord + " _";
        }
    }
    console.log(displayWord);

    updateDisplay(displayWord);
}

function updateWins(wins) {
    $("#wins").text(wins);
}

function updateDisplay(displayWord) {
    $("#displayWord").html("<pre>" + displayWord + "</pre>");
}

function updateGuesses(remainingGuesses) {
    $("#remainingGuesses").text(remainingGuesses);
}

function updateLettersGuessed(lettersGuessed) {
    $("#lettersGuessed").html("<pre>" + lettersGuessed + "</pre>");
}

$(document).ready(function() {

    var word = newWord();

    console.log("Your word is: " + word);

    updateWins(wins);

    insertWord(word);

    updateGuesses(remainingGuesses);

    updateLettersGuessed(lettersGuessed);
    
})

$(document).keyup(function(e) {

    // Need to figure out why this equals "t" when F5 is released.
    var keyPressed = String.fromCharCode(e.keyCode);
    console.log(keyPressed);
})