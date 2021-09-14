const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() { 
    // console.log('I was clicked');
    // console.log(this);

    // this.classList.toggle('flip');
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        // console.log({hasFlippedCard, firstCard});
        return 
    }  
    // second click
    // hasFlippedCard = false;
    secondCard = this;

    // console.log("Function was executed!");
    checkForMatch();
    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    // console.log({firstCard, secondCard})
    // do cards match

    isMatch ? disableCards() : unFlipCards();

    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     // it's a match
    //     disableCards();
    
    // } else { 
    //     // not a match
    //     unFlipCards();
    // }
}

function disableCards() {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false],
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPas = Math.floor(Math.random() * 12);
        card.style.order = randomPas;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))