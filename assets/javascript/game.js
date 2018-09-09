
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
var displayArray = [];
var remainingGuesses = 15;
var lettersGuessed = [];
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
            displayArray[j] = " ";
        } else {
            displayArray[j] = "_";
        }
    }
    console.log(displayArray);

    updateDisplay(displayArray);
}

function updateWins(wins) {
    $("#wins").text(wins);
}

function updateDisplay(displayArray) {
    var displayText = "";

    for (let i = 0; i < displayArray.length; i++) {
        displayText = displayText + " " + displayArray[i];
    }

    console.log(displayText);
    $("#displayWord").html("<pre>" + displayText + "</pre>");
}

function updateGuesses() {
    $("#remainingGuesses").text(remainingGuesses);
}

function updateLettersGuessed() {
    var lettersText = "";

    for (let i = 0; i < lettersGuessed.length; i++) {
        if (i === 0) {
            lettersText = lettersGuessed[0];
        } else {
            lettersText = lettersText + ", " + lettersGuessed[i];
        }
    }
    

    $("#lettersGuessed").html(lettersText);
}

function guessLetter(keyPressed) {
    var count = 0;

    // Checks to see if the letter has already been guessed.
    var hasBeenGuessed = false;
    for (let j = 0; j < lettersGuessed.length; j++) {
        if (keyPressed == lettersGuessed[j]) {
            hasBeenGuessed = true;
        }
    }

    console.log(hasBeenGuessed);

    // If the letter has been guessed, nothing happens
    if (hasBeenGuessed === false) {
        for (let i = 0; i < wordArray.length; i++) {

            // If the letter is in the word(s)...
            if (keyPressed === wordArray[i]) {
                count++;
                displayArray[i] = wordArray[i];
                updateDisplay(displayArray);
            }
        }

        // If the letter is not in the word(s) at all...
        if (count === 0) {
            remainingGuesses--;
            updateGuesses();
            lettersGuessed.push(keyPressed);
            updateLettersGuessed();
            console.log(lettersGuessed);
        }

        // Need any else functionality here for what happens if the letter has been guessed?
    }
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
    if (keyPressed !== "t"){
        console.log(keyPressed);

        guessLetter(keyPressed);
    }
})