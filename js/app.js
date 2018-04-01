/*
 * Create a list that holds all of your cards
 */

let allCards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-bomb",
  "fa-bomb",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-anchor",
  "fa-anchor",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle"
];

let clickCounter = 0;
let storeCardClassOne = "";
let storeCardClassTwo = "";
let allowNextTurn = true;
let numberOfTotalMoves = 0;
let numberOfPairsMatched = 0;
let timer = undefined;
let timeInSeconds = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//resets scoreboard and functions when game is reset or game is started
function startGame() {
  clickCounter = 0;
  storeCardClassOne = "";
  storeCardClassTwo = "";
  allowNextTurn = true;
  numberOfPairsMatched = 0;
  numberOfTotalMoves = 0;
  document.getElementById("moves").innerHTML = "0";
  document.getElementById("timer").innerHTML = "0 seconds";
  timeInSeconds = 0;
  clearInterval(timer);
  timer = undefined;
  $("#deck").empty();
  resetStarsOnStart();
  addCardsToDeck();
}

//a timer function
function startTimer() {
  if (timer === undefined) {
    if (clickCounter === 1 && numberOfTotalMoves === 0) {
      timer = setInterval(() => {
        timeInSeconds = +timeInSeconds + 1;
        if (timeInSeconds > 59) {
          let minute = Math.round(timeInSeconds / 60);
          let second = timeInSeconds % 60;
          if (second < 10) {
            second = "0" + second;
          }
          if (minute < 10) {
            minute = "0" + minute;
          }
          document.getElementById(
            "timer"
          ).innerHTML = `${minute}:${second} minutes`;
        } else {
          document.getElementById(
            "timer"
          ).innerHTML = `${timeInSeconds} seconds`;
        }
      }, 1000);
    }
  }
}

function getTime() {
  if (timeInSeconds > 59) {
    let minute = Math.round(timeInSeconds / 60);
    let second = timeInSeconds % 60;
    if (second < 10) {
      second = "0" + second;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    return `${minute}:${second} minutes`;
  }

  return `${timeInSeconds} seconds`
}

startGame();

//shuffles the deck
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//converts the array of all the class names into a deck, which shuffles
function addCardsToDeck() {
  const shuffledCards = shuffle(allCards);

  for (cards in shuffledCards) {
    const deckReference = $("#deck");
    const listItem = `<li class= 'card' id="card"><i id="shuffledCard" class ='fa ${
      shuffledCards[cards]
    }'></i></li>`;
    const listItemHTML = createElementFromHTML(listItem);
    listItemHTML.addEventListener("click", onCardClick);
    deckReference.append(listItemHTML);
  }
}

//allows HTML strings to be manipulated in JS
function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

//resets the function when the first card is clicked
function onCardClick() {
  if (!allowNextTurn) {
    return;
  }
  revealCard(this);
  incrementClickCounter(this);
  startTimer();
  storeListItem(this);
  checkIfCardsMatch();
  incrementTotalAttempts();
  resetCounterAfterSecondCLick();
  starsIncrementer();
  endGame();
  console.log(this);
}

//removes stars on the scoreboard as the player continues on
function starsIncrementer() {
  if (numberOfTotalMoves > 12 && numberOfTotalMoves <= 18) {
    const starThree = document.getElementById("star3");
    starThree.classList.add("hide");
  } else if (numberOfTotalMoves > 18) {
    const starThree = document.getElementById("star3");
    const starTwo = document.getElementById("star2");
    starThree.classList.add("hide");
    starTwo.classList.add("hide");
  }
}

//shows the stars for the alert message
function getStarCount() {
  let counter = 3;
  const stars = ["star1", "star2", "star3"];
  for (star of stars) {
    const htmlStar = document.getElementById(star);
    if (htmlStar.classList.contains("hide")) {
      counter--;
    }
  }
  return counter;
}

//shows the card that is clicked
function revealCard(listItem) {
  listItem.classList.add("show", "open");
}

//increments click counter
function incrementClickCounter(listItem) {
  if (clickCounter === 1) {
    if (!(listItem === storeCardClassOne)) {
      clickCounter++;
    }
  } else {
    clickCounter++;
  }
}

//stores the class of clicked cards
function storeListItem(itemClicked) {
  if (clickCounter === 1) {
    storeCardClassOne = itemClicked;
  } else if (clickCounter === 2) {
    storeCardClassTwo = itemClicked;
  }
}

//allows only two cards to be clicked at most
function resetCounterAfterSecondCLick() {
  if (clickCounter === 2) {
    clickCounter = 0;
  }
}

//calls a function that verifies if cards match
function checkIfCardsMatch() {
  if (clickCounter === 2) {
    if (ifCardsMatch()) {
      addMatchClassToCards();
      numberOfPairsMatched++;
    } else {
      removingNonMatchingCardClasses();
    }
  }
}

//counts the number of total moves
function incrementTotalAttempts() {
  if (clickCounter === 2) {
    numberOfTotalMoves++;
    document.getElementById("moves").innerHTML = numberOfTotalMoves;
  }
}

//adds match class to cards
function addMatchClassToCards() {
  storeCardClassOne.classList.add("match");
  storeCardClassTwo.classList.add("match");
}

//function that checks if the cards match
function ifCardsMatch() {
  return storeCardClassOne.innerHTML === storeCardClassTwo.innerHTML;
}

//flips the cards back over if they do not match
function removingNonMatchingCardClasses() {
  allowNextTurn = false;
  setTimeout(() => {
    storeCardClassOne.classList.remove("show", "open");
    storeCardClassTwo.classList.remove("show", "open");
    allowNextTurn = true;
  }, 600);
}

//resets stars back to 3 on reset
function resetStarsOnStart() {
  const stars = ["star1", "star2", "star3"];
  for (star of stars) {
    const htmlStar = document.getElementById(star);
    if (htmlStar.classList.contains("hide")) {
      htmlStar.classList.remove("hide");
    }
  }
}

//alert message after game is finished
function endGame() {
  if (numberOfPairsMatched === 8) {
    console.log("RUNNING END GAME");
    const message =
      "You have finished the game! Your total moves were: " +
      numberOfTotalMoves +
      ". Your total time is " +
      getTime() +
      ". And your star rating is: " +
      getStarCount() +
      "!";
    setTimeout(() => {
      swal({
        title: "Congratulations! ",
        text: message,
        buttons: {
          playAgain: {
            text: "Play Again",
            value: "playAgain"
          }
        }
      }).then(value => {
        if (value === "playAgain") {
          startGame();
        }
      });
    }, 300);
  }
}

// function onCardClick() {
//   this.classList.add("show", "open");
//   cardsClicked++;
//   matchCards(this);
// }

// function matchCards(listItem) {
//   //storing each card clicked into a variable
//   if (cardsClicked === 1) {
//     storeCardClassOne = listItem;
//     console.log(storeCardClassOne);
//   } else if (cardsClicked === 2) {
//     storeCardClassTwo = listItem;
//     console.log(storeCardClassTwo);
//     //check to see if the cards match
//     checkSecondCondition();
//   }
// }

// const removeOpenAndShowClass = () => {
//   setTimeout(function() {
//     storeCardClassOne.classList.remove("open", "show");
//     storeCardClassTwo.classList.remove("open", "show");
//   }, 500);
// };

// function checkSecondCondition() {
//   if (storeCardClassOne.innerHTML === storeCardClassTwo.innerHTML) {
//     storeCardClassOne.classList.add("match");
//     storeCardClassTwo.classList.add("match");
//     cardsClicked = 0;
//     console.log("its a match!");
//   } else {
//     removeOpenAndShowClass();
//     cardsClicked = 0;
//     console.log("nope! Try again!");
//   }
// }
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
