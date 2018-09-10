
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
    "WEEPING ANGEL",
]

var wordImages = {
    "THE DOCTOR": "the-doctor.jpg",
    "THE MASTER": "the-master.jpg",
    "DALEK": "dalek.jpg",
    "TARDIS": "tardis.jpg",
    "CYBERMAN": "cyberman.jpg",
    "SONTARAN": "sontaran.jpg",
    "GALLIFREY": "gallifrey.jpg",
    "ZYGON": "zygon.jpg",
    "COMPANION": "companion.png",
    "TORCHWOOD": "torchwood.jpg",
    "SONIC SCREWDRIVER": "sonic-screwdriver.jpg",
    "EXTERMINATE": "exterminate.jpg",
    "ROSE TYLER": "rose-tyler.png",
    "BAD WOLF": "bad-wolf.jpg",
    "TIME LORD": "time-lord.jpg",
    "BOW TIE": "bow-tie.jpg",
    "RIVER SONG": "river-song",
    "FANTASTIC": "fantastic.png",
    "ALLONS Y": "allons-y.jpg",
    "GERONIMO": "geronimo.jpg",
    "TIME VORTEX": "time-vortex.jpg",
    "JACK HARKNESS": "jack-harkness.jpg",
    "DONNA NOBLE": "donna-noble.jpg",
    "MARTHA JONES": "martha-jones.jpg",
    "AMY POND": "amy-pong.jpg",
    "RORY WILLIAMS": "rory-williams.jpg",
    "CLARA OSWALD": "clara-oswald.jpg",
    "NARDOLE": "nardole.jpg",
    "BILL POTTS": "bill-potts.png",
    "THE SILENCE": "the-silence.jpg",
    "SLITHEEN": "slitheen.jpg",
    "WEEPING ANGEL": "weeping-angel.jpg"
}

var wordArray = [];
var displayArray = [];
var remainingGuesses = 15;
var lettersGuessed = ["--"];
var wins = 0;
var word;

function didIWin() {
    var count = 0;
    for (let i = 0; i < displayArray.length; i++) {
        if (displayArray[i] === "_") {
            count++;
        }
    }

    if (count === 0) {
        return true;
    } else {
        return false;
    }
}

function reset(){
    word = newWord();

    console.log("Your word is: " + word);

    updateWins(wins);

    insertWord(word);

    updateGuesses(remainingGuesses);

    updateLettersGuessed(lettersGuessed);
}

function newWord(){
    return possibleWords[Math.floor(Math.random() * possibleWords.length)];
}

function insertWord(word) { 
    wordArray = [];
    displayArray =[];

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

function updateWins() {
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

function updatePicture(){
    var imgName = wordImages(word);
    $("#wordImage").attr("src", "images/word-images/" + imgName);
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
            if (lettersGuessed[0] === "--"){
                lettersGuessed[0] = keyPressed;
            } else {
                lettersGuessed.push(keyPressed);
            }
            updateLettersGuessed();
            console.log(lettersGuessed);
        }

        // Need any else functionality here for what happens if the letter has been guessed?
    }

    // Check to see if the user won the game, and if so, do the winning stuff.
    if (didIWin()){
        updatePicture();
        $("#lastWord").text(word);
        wins++;
        updateWins();
        remainingGuesses = 15;
        lettersGuessed = ["--"];
        reset();
    }

    // Need to add in lose mechanic.
}

$(document).ready(reset());

$(document).keyup(function(e) {

    // Makes sure the key that was pressed is a letter
    if (e.keyCode >= 65 && e.keyCode <= 90){

        var keyPressed = String.fromCharCode(e.keyCode);
        if (keyPressed !== "t"){
            console.log(keyPressed);

            guessLetter(keyPressed);
        }

    }
})
