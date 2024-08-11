document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.getElementById('resetBtn');
    const movesElement = document.getElementById('moves');
    
    const cardSymbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍'];
    let cards = [...cardSymbols, ...cardSymbols]; // Duplicate symbols to create pairs
    let flippedCards = [];
    let moves = 0;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        shuffle(cards);
        gameBoard.innerHTML = '';
        cards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.innerHTML = `<div class="card-inner">${symbol}</div>`;
            gameBoard.appendChild(card);
        });
    }

    function updateMoves() {
        moves++;
        movesElement.textContent = `Moves: ${moves}`;
    }

    function checkWin() {
        const matchedCards = document.querySelectorAll('.card.matched');
        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                alert(`You won in ${moves} moves!`);
            }, 500);
        }
    }

    gameBoard.addEventListener('click', event => {
        const clickedCard = event.target.closest('.card');
        if (!clickedCard || flippedCards.length === 2 || clickedCard.classList.contains('flipped')) return;

        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            updateMoves();
            setTimeout(() => {
                if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                    flippedCards.forEach(card => card.classList.add('matched'));
                    checkWin();
                } else {
                    flippedCards.forEach(card => card.classList.remove('flipped'));
                }
                flippedCards = [];
            }, 1000);
        }
    });

    resetBtn.addEventListener('click', () => {
        resetGame();
        moves = 0;
        movesElement.textContent = `Moves: ${moves}`;
    });

    function resetGame() {
        flippedCards = [];
        createBoard();
        moves = 0;
        movesElement.textContent = `Moves: ${moves}`;
    }

    createBoard();
});
