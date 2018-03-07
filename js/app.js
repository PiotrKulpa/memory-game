 /**
 * @description DOM elements and temporary files.
 */

let arrOfCards = [],
    cards = document.querySelectorAll('.card'),
    openCardsArr = [],
    counter = 0,
    displayMoves = document.querySelectorAll('.moves'),
    displayTime = document.querySelectorAll('.timer'),
    restart = document.querySelectorAll('.restart'),
    timeOfGame = 0,
    openedCard,
    stars = document.querySelectorAll('.stars'),
    startTimer,
    popup = document.querySelector('.popup');

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
 const initClickCard = () => {
   for (let x = 0; x < cards.length; x++) {
    cards[x].addEventListener('click', clickCard);
   }
 }

 /**
 * @function
 * @description Clear all cards click.
 */
 const removeClickCard = () => {
  for (let x = 0; x < cards.length; x++) {
    cards[x].removeEventListener('click', clickCard);
  };
 }

 /**
 * @function
 * @description Remove click from matched cards.
 */
 const removeClickMatched = () => {
   openCardsArr.forEach((el) => {
     el.removeEventListener('click', clickCard);
   });
 }

 /**
 * @function
 * @description Display shuffled cards.
 */
 const displayCards = () => {
   let documentFragment = document.createDocumentFragment(),
      deck = document.querySelector('.deck'),
      cardList = document.querySelectorAll('.deck li');
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
const shuffle = (array) => {
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
 * @description Show card.
 */
 const displaySymbol = (e) => {
   e.target.classList.add('show', 'open');
 }

 /**
 * @function
 * @description List of opened cards.
 */
 const openedCardsList = (e) => {
   /** Insert opened card to list of opened cards*/
   openCardsArr.push(e.target);
 }

 /**
 * @function
 * @description Get name of  first opened card.
 */
 const firstCard = (e) => {
   openedCard = e.target;
 }

 /**
 * @function
 * @description Compare cards.
 */
 let compareCards = (e) => {
   let arrOfClass = [];
   openCardsArr.forEach((el) => {
     arrOfClass.push(el.firstElementChild.className);
   });
   return arrOfClass.includes(e.target.firstElementChild.className);
 }

 /**
 * @function
 * @description Check odd and even click.
 */
 const checkList = (e) => {

   /** Check even clicks. */
   if (counter % 2 === 0) {

     /** Check if cards match. */
     /** If cards match. */
     if (compareCards(e)) {
       let similarCards =  document.getElementsByClassName(e.target.className);

       /** Set style to 'match'. */
       for (let a = 0; a < similarCards.length; a++) {
         similarCards[a].classList.add('match');
       };

       /** Insert card to list of opened cards. */
       openedCardsList(e);

       /** Remove click from matched cards. */
       removeClickMatched();

       /** Show final scores if all cards match. */
       finalScore();

      /** If cards not match.*/
     } else {
       /** Remove click from all cards. */
       removeClickCard();

       /** Add not-match style to last 2 cards. */
       openedCard.classList.add('not-match');
       e.target.classList.add('not-match');

        /** Insert clicked card to list of opened cards. */
       openedCardsList(e);

        /** Remove 2 last cards from list of opened cards. */
       openCardsArr.splice(openCardsArr.length - 2, 2);

       /** After 1 s. hide cards.*/
       let alertPromise = new Promise((resolve, reject) => {
         let delay = setTimeout(function () {
           resolve('Success!');
           clearTimeout(delay);
         }, 500);
       });
       alertPromise.then(() => {

         /** Hide not matched cards.*/
         e.target.className = 'card';
         openedCard.classList.remove('show', 'open', 'not-match');

         /** Add again click to all cards. */
         initClickCard();

          /** Remove click from all opened cards. */
         removeClickMatched();
       });
     };

     /** Open card when odd click. */
   } else {
     /** Insert clicked card to list of opened cards. */
     openedCardsList(e);

     /** Remove click from last opened cards. */
     e.target.removeEventListener('click', clickCard);

     /** Remove click from all opened cards. */
     removeClickMatched();

     /** Set name of first(odd) card. */
     firstCard(e);
   }
 }

 /**
 * @function
 * @description Display moves and stars.
 */
 const incrementCounter = () => {
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
 const finalScore = () => {
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
 const clickCard = (e) => {
   incrementCounter();
   displaySymbol(e);
   checkList(e);
 }

 /**
 * @function
 * @description Set timer.
 */
 const stopwatch = () => {
   startTimer = setTimeout(function () {
     timeOfGame++;
     displayTime.forEach((el) => {
       el.innerText = timeOfGame;
     });
     stopwatch();
 }, 1000);
}

/** Initialize game*/
init();

/** Restart game*/
restart.forEach((el) => {
  el.addEventListener('click', function(e) {
    init();
  });
});
