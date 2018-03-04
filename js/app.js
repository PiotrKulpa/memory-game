 /**
 * @description DOM elements and temporary files.
 */
let cardList = document.querySelectorAll('.deck li');
let arrOfCards = [];
let deck = document.querySelector('.deck');
let cards = document.querySelectorAll('.card');
let documentFragment = document.createDocumentFragment();
let openCardsArr = [];
let counter = 0;
let displayMoves = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let timeOfGame = 0;
let openedCard;
let stars = document.querySelectorAll('.stars li');
let startTimer;

 /**
 * @function
 * @description Initialize function.
 */
 function init() {
   clearTimeout(startTimer);
   displayMoves.innerText = 0;
   timeOfGame = 0;
   openCardsArr = [];
   counter = 0;
   displayCards();
   stopwatch();
   initClickCard();
   stars.forEach(function(el) {
     el.style.display = 'inline-block';
   });
 }

 /**
 * @function
 * @description Initialize card click.
 */
 function initClickCard() {
   for (let x = 0; x < cards.length; x++) {
    cards[x].addEventListener('click', clickCard);
   }
 }

 /**
 * @function
 * @description Create a list that holds all of your cards.
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

/**
* @function
* @description Shuffle function from http://stackoverflow.com/a/2450976.
*/
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

 /**
 * @function
 * @description Open card.
 */
 function displaySymbol(e) {
   e.target.classList.add('show', 'open');
 }

 /**
 * @function
 * @description Opened cards list.
 */
 function openedCardsList(e) {
   /** Insert first(odd) opened card to list of opened cards*/
  openCardsArr.push(e.target.firstElementChild.className);
  /** Set second(even) opened card*/
  openedCard = e.target;
 }

 /**
 * @function
 * @description Check opened cards list.
 */
 function checkList(e) {
   /** Check even clicks. */
   if (counter % 2 === 0) {
     /** Check if cards match. */
     /** If cards match. */
     if (openCardsArr.includes(e.target.firstElementChild.className)) {
       /** Get similar cards.*/
       var similarCards =  document.getElementsByClassName(e.target.firstElementChild.className);
       /** Set style to 'match'. */
       for (let a = 0; a < similarCards.length; a++) {
         similarCards[a].parentNode.classList.add('match');
       };
       /** Remove click from matched cards. */
       e.target.removeEventListener('click', clickCard);
       openedCard.removeEventListener('click', clickCard);
       /** Show final scores if all cards match. */
       finalScore();
      /** If cards not match.*/
     } else {
       /** Remove click from not matched cards. */
       e.target.removeEventListener('click', clickCard);
       openedCard.removeEventListener('click', clickCard);
       /** Show not matched cards with red background.*/
       openedCard.classList.add('not-match');
       e.target.classList.add('not-match');
       /** After 1 s. hide cards.*/
       let delay = setTimeout(function () {
         /** Add again click to not matched cards. */
         e.target.addEventListener('click', clickCard);
         openedCard.addEventListener('click', clickCard);
         /** Hide not matched cards.*/
         e.target.className = 'card';
         openedCard.classList.remove('show', 'open', 'not-match');
         /** Remove last card from list of opened cards. */
         openCardsArr.splice(openCardsArr.length -1, 1);
         clearTimeout(delay);
       }, 500);

     };
     /** Open card when odd click. */
   } else {
     /** Add this card to list of opened cards. */
     openedCardsList(e);
     /** Prevent second click on same card. */
     e.target.removeEventListener('click', clickCard);
   }
 }

 /**
 * @function
 * @description Display moves and stars.
 */
 function incrementCounter() {
   counter++;
   displayMoves.innerText = counter;
   switch(true) {
     case counter > 20 && counter < 24:
      stars[2].style.display = 'none';
      break;
     case counter > 24:
      stars[1].style.display = 'none';
      break;
   };
 }

 /**
 * @function
 * @description Display final crores.
 */
 function finalScore() {
   if(openCardsArr.length === 8) {
     alert(`Finished with ${counter} moves in ${timeOfGame} seconds`);
     clearTimeout(startTimer);
   };
 }

 /**
 * @function
 * @description After click card increment counter, display this card symbol and check opened cards list.
 */
 function clickCard(e) {
   incrementCounter();
   displaySymbol(e);
   checkList(e);
 }

 /**
 * @function
 * @description Set timer.
 */
 function stopwatch() {
   startTimer = setTimeout(function () {
     timeOfGame++;
     stopwatch();
 }, 1000);
}

/** Initialize game*/
init();

/** Restart game*/
restart.addEventListener('click', function(e) {
  init();
});
