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
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function startGame() {
    clickCounter=0;
    storeCardClassOne="";
    storeCardClassTwo="";
    allowNextTurn = true;
    numberOfPairsMatched = 0;
    numberOfTotalMoves = 0;
    document.getElementById("moves").innerHTML = "0";
    $("#deck").empty();
    addCardsToDeck();
}

startGame();

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

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function onCardClick() {
  if (!allowNextTurn) {
    return;
  }
  revealCard(this);
  incrementClickCounter(this);
  storeListItem(this);
  checkIfCardsMatch();
  incrementTotalAttempts();
  resetCounterAfterSecondCLick();
  endGame();
  console.log(this);
}

function revealCard(listItem) {
  listItem.classList.add("show", "open");
}

function incrementClickCounter(listItem) {
  if (clickCounter === 1) {
    if (!(listItem === storeCardClassOne)) {
      clickCounter++;
    }
  } else {
    clickCounter++;
  }
}

function storeListItem(itemClicked) {
  if (clickCounter === 1) {
    storeCardClassOne = itemClicked;
  } else if (clickCounter === 2) {
    storeCardClassTwo = itemClicked;
  }
}

function resetCounterAfterSecondCLick() {
  if (clickCounter === 2) {
    clickCounter = 0;
  }
}

function checkIfCardsMatch() {
  if (clickCounter === 2) {
    if (ifCardsMatch()) {
      addMatchClassToCards();
      numberOfPairsMatched++;
      console.log("number of matched pairs:" + numberOfPairsMatched);
    } else {
      removingNonMatchingCardClasses();
    }
  }
}

function incrementTotalAttempts(){
    if(clickCounter===2){
        numberOfTotalMoves++;
        document.getElementById("moves").innerHTML = numberOfTotalMoves;

        console.log("total moves: " ,numberOfTotalMoves);
    }
}

function addMatchClassToCards() {
  storeCardClassOne.classList.add("match");
  storeCardClassTwo.classList.add("match");
}

function ifCardsMatch() {
  return storeCardClassOne.innerHTML === storeCardClassTwo.innerHTML;
}

function removingNonMatchingCardClasses() {
  allowNextTurn = false;
  setTimeout(() => {
    storeCardClassOne.classList.remove("show", "open");
    storeCardClassTwo.classList.remove("show", "open");
    allowNextTurn = true;
  }, 600);
}

function endGame() {
  if (numberOfPairsMatched === 8) {
    setTimeout(() => {
      alert("you have finished the game!");
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
