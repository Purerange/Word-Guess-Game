
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
    "RIVER SONG": "river-song.jpg",
    "FANTASTIC": "fantastic.png",
    "ALLONS Y": "allons-y.jpg",
    "GERONIMO": "geronimo.jpg",
    "TIME VORTEX": "time-vortex.jpg",
    "JACK HARKNESS": "jack-harkness.jpg",
    "DONNA NOBLE": "donna-noble.jpg",
    "MARTHA JONES": "martha-jones.jpg",
    "AMY POND": "amy-pond.jpg",
    "RORY WILLIAMS": "rory-williams.jpg",
    "CLARA OSWALD": "clara-oswald.jpg",
    "NARDOLE": "nardole.jpg",
    "BILL POTTS": "bill-potts.png",
    "THE SILENCE": "the-silence.jpg",
    "SLITHEEN": "slitheen.jpg",
    "WEEPING ANGEL": "weeping-angel.jpg"
}


var displayArray = [];
var remainingGuesses = 15;
var lettersGuessed = ["--"];
var wins = 0;
var word;
var wordArray = [];
var wordsGuessed = [];

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

function gameOver() {
    alert("You have run out of guesses! The word was " + word + ". Game Over...");

    hardReset();
}

function hardReset() {
    wins = 0;
    remainingGuesses = 15;
    wordsGuessed = [];
    lettersGuessed = [];
    $("#wordImage").attr("src", "assets/images/placeholder.png")
    $("#lastWord").text("");
    reset();
}

function insertWord(word) { 
    wordArray = [];
    displayArray =[];

    for (let i = 0; i < word.length; i++) {
        wordArray.push(word[i]);
    }

    for (let j = 0; j < wordArray.length; j++) {
        if (wordArray[j] === " ") {
            displayArray[j] = " ";
        } else {
            displayArray[j] = "_";
        }
    }

    updateDisplay(displayArray);
}

function newWord(){
    var newWord;
    
    do {
        newWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
        var isUnique = true;
        for (let i = 0; i < wordsGuessed.length; i++) {
            if (newWord === wordsGuessed[i]) {
                isUnique = false;
            }
        }
    } while (!isUnique);
    
    return newWord;
}

function reset(){
    word = newWord();

    console.log("Your word is: " + word);

    updateWins(wins);

    insertWord(word);

    updateGuesses(remainingGuesses);

    updateLettersGuessed(lettersGuessed);
}

function restartSong() {
    document.getElementById("song").currentTime = 0;
    document.getElementById("song").play();
}

function updateDisplay(displayArray) {
    var displayText = "";

    for (let i = 0; i < displayArray.length; i++) {
        displayText = displayText + " " + displayArray[i];
    }

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
    var imgName = wordImages[word];
    $("#wordImage").attr("src", "assets/images/word-images/" + imgName);
}

function updateWins() {
    $("#wins").text(wins);
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
            if (remainingGuesses === 0) {
                gameOver();
            } else if (lettersGuessed[0] === "--"){
                lettersGuessed[0] = keyPressed;
            } else {
                lettersGuessed.push(keyPressed);
            }
            updateLettersGuessed();
        }

        // Need any else functionality here for what happens if the letter has been guessed?
    }

    // Check to see if the user won the game, and if so, do the winning stuff.
    if (didIWin()){
        restartSong();
        wins++;
        updateWins();

        updatePicture();

        $("#lastWord").text(word);

        if (wins === 32){

            alert("You have guessed all the words! Congratulations!");

        } else {

            remainingGuesses = 15;

            lettersGuessed = ["--"];

            wordsGuessed.push(word);

            reset();
        }
    }
}

$(document).ready(reset());

$(document).keyup(function(e) {

    // Makes sure the key that was pressed is a letter
    if (e.keyCode >= 65 && e.keyCode <= 90){

        if (wins === 32) {
            alert("You have already guessed all the words! Refresh to start over!");
        } else {
            var keyPressed = String.fromCharCode(e.keyCode);
        
            guessLetter(keyPressed);
        }
    }
})
