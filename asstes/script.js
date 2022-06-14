const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fristCard, secondCard;
let lockBoard = false;

function flipCards() {
    if(lockBoard) return;
    if(this === fristCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        fristCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(fristCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    fristCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() =>{
        fristCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [flipCards, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach ((card) => {
        let ramdomPosition = Math.floor(Math.random () * 12);
        card.style.order = ramdomPosition;
    })
}
) (); //immediate function

cards.forEach((cards) => {
    cards.addEventListener('click', flipCards);
})

