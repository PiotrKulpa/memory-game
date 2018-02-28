/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll('.deck li');
let arrOfCards = [];
let deck = document.querySelector('.deck');
let cards = document.querySelectorAll('.card');
let documentFragment = document.createDocumentFragment();
let openCardsArr = [];
let counter = 0;
let displayMoves = document.querySelector('.moves');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCards() {
   //convert nodeList to array
   for (let i = 0; i < cardList.length; i++) {
     arrOfCards[i] = cardList[i];
   }
   //shuffle cards
   arrOfCards = shuffle(arrOfCards);
   //loop
   arrOfCards.forEach(function (el) {
     //remove old cards
     el.remove();
     el.className = 'card';
     documentFragment.appendChild(el);
   });
   //append shuffled cards
   deck.appendChild(documentFragment);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

displayCards();

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

 function displaySymbol(e) {
   e.target.classList.add('show', 'open');
 }

 function openedCardsList(e) {
  openCardsArr.push(e.target.firstElementChild.className);
 }

 function checkList(e) {
   if (openCardsArr.includes(e.target.firstElementChild.className)) {
     var similarCards =  document.getElementsByClassName(e.target.firstElementChild.className);
     for (let a = 0; a < similarCards.length; a++) {
       similarCards[a].parentNode.classList.add('match');
     }
   };
 }

 function incrementCounter() {
   counter++;
   displayMoves.innerText = counter;
 }

for (let x = 0; x < cards.length; x++) {
 cards[x].addEventListener('click', function(e) {
   displaySymbol(e);
   checkList(e);
   openedCardsList(e);
   incrementCounter();
 });
}
