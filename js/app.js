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
let displayMoves = document.querySelectorAll('.moves');
let displayTime = document.querySelectorAll('.timer');
let restart = document.querySelectorAll('.restart');
let timeOfGame = 0;
let openedCard;
let stars = document.querySelectorAll('.stars');
let startTimer;
let popup = document.querySelector('.popup');

 /**
 * @function
 * @description Initialize function.
 */
const init = () => {
   clearTimeout(startTimer);
   displayMoves.forEach((el) => {
     el.innerText = 0;
   });
   displayTime.forEach((el) => {
     el.innerText = 0;
   });
   timeOfGame = 0;
   openCardsArr = [];
   counter = 0;
   displayCards();
   stopwatch();
   initClickCard();
   stars.forEach(function(el) {
     for (let i = 0; i < el.children.length; i++) {
       el.children[i].style.display = 'inline-block';
     };
   });
   popup.style.display = 'none';
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
 * @description Remove cards click.
 */
 function removeClickCard() {
   for (let x = 0; x < cards.length; x++) {
    cards[x].removeEventListener('click', clickCard);
   }
 }

 /**
 * @function
 * @description Remove click from matched cards.
 */
 function removeClickMatched() {
   arrOfCards.forEach((el) => {
     el.parentNode.removeEventListener('click', clickCard);
   });
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
 const displaySymbol = (e) => {
   e.target.classList.add('show', 'open');
 }

 /**
 * @function
 * @description Opened cards list.
 */
 function openedCardsList(e) {
   /** Insert opened card to list of opened cards*/
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

       /** Add cards to opened list. */
       openedCardsList(e);

       /** Show final scores if all cards match. */
       finalScore();
      /** If cards not match.*/
     } else {

       /** Remove click from not matched cards. */
       removeClickCard();
       /** Show not matched cards with red background.*/
       openedCard.classList.add('not-match');
       e.target.classList.add('not-match');
       /** After 1 s. hide cards.*/
       let delay = setTimeout(function () {
         /** Add again click to not matched cards. */
         initClickCard();
         removeClickMatched();
         /** Hide not matched cards.*/
         e.target.className = 'card';
         openedCard.classList.remove('show', 'open', 'not-match');
         /** Add cards to opened list. */
         openedCardsList(e);
         /** Remove last card from list of opened cards. */
         openCardsArr.splice(openCardsArr.length -2, 2);
         console.log(openCardsArr);
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
   displayMoves.forEach((el) => {
     el.innerText = counter;
   });
   switch(true) {
     case counter > 20 && counter < 24:
      for (let i = 0; i < stars.length; i++) {
        stars[i].children[2].style.display = 'none';
      };
      break;
     case counter > 24:
     for (let i = 0; i < stars.length; i++) {
       stars[i].children[1].style.display = 'none';
     };
      break;
   };
 }

 /**
 * @function
 * @description Display final crores.
 */
 function finalScore() {
   if(openCardsArr.length === 16) {
     popup.style.display = 'block';
     popup.classList.add('slide-bottom');
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
     //displayTime.innerText = timeOfGame;
     displayTime.forEach((el) => {
       el.innerText = timeOfGame;
     });
     stopwatch();
 }, 1000);
}

/** Initialize game*/
init();

/** Restart game*/
restart.forEach((el)=>{
  el.addEventListener('click', function(e) {
    init();
  });
});
