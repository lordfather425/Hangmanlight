function HangmanWidget() {
  var hangmanWordList = ["HANGMAN", "APPLE", "COMPUTER"]; // List of words
  var hangmanWord = hangmanWordList[Math.floor(Math.random() * hangmanWordList.length)];
  var wordPlaceholder = document.getElementById("wordPlaceholder");
  var guessesLeft = document.getElementById("guessesLeft");
  var gameStatus = document.getElementById("gameStatus");
  var newGameButton = document.getElementById("newGameButton");
  var stickFigureParts = document.querySelectorAll(".stick-figure > div");

  var guessedLetters = [];
  var remainingGuesses = 6;

  function initializeGame() {
    hangmanWord = hangmanWordList[Math.floor(Math.random() * hangmanWordList.length)];
    wordPlaceholder.textContent = "_".repeat(hangmanWord.length);
    remainingGuesses = 6; // Reset the guesses left
    guessesLeft.textContent = remainingGuesses;
    guessedLetters = [];
    gameStatus.textContent = "";
    newGameButton.disabled = true;
    drawStickFigure(remainingGuesses);
  }

  function updateWordPlaceholder() {
    var updatedPlaceholder = "";
    for (var i = 0; i < hangmanWord.length; i++) {
      if (guessedLetters.includes(hangmanWord[i])) {
        updatedPlaceholder += hangmanWord[i];
      } else {
        updatedPlaceholder += "_";
      }
    }
    wordPlaceholder.textContent = updatedPlaceholder;
  }

  function drawStickFigure(remainingGuesses) {
    for (var i = 0; i < stickFigureParts.length; i++) {
      stickFigureParts[i].style.visibility = i >= (6 - remainingGuesses) ? "visible" : "hidden";
    }
  }

  function checkLetter(letter) {
    if (guessedLetters.includes(letter)) {
      return;
    }

    guessedLetters.push(letter);

    if (hangmanWord.includes(letter)) {
      updateWordPlaceholder();
    } else {
      remainingGuesses--;
      guessesLeft.textContent = remainingGuesses;
    }

    if (wordPlaceholder.textContent === hangmanWord) {
      gameStatus.textContent = "You Win!";
      newGameButton.disabled = false;
    } else if (remainingGuesses === 0) {
      gameStatus.textContent = "Game Over";
      newGameButton.disabled = false;
    }

    drawStickFigure(remainingGuesses);
  }

  var letterChoices = document.querySelectorAll(".letter-choice");
  letterChoices.forEach(function (button) {
    button.addEventListener("click", function () {
      if (remainingGuesses > 0 && gameStatus.textContent === "") {
        checkLetter(button.textContent);
      }
    });
  });

  newGameButton.addEventListener("click", initializeGame);

  initializeGame();
}

HangmanWidget();
