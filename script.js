document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.getElementById('resetBtn');
    const movesElement = document.getElementById('moves');
    const timerElement = document.getElementById('timer');
    const difficultySelector = document.getElementById('difficulty');

    const cardSymbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍'];
    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let timer = 0;
    let timerInterval;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function startTimer() {
        clearInterval(timerInterval);
        timer = 0;
        timerElement.textContent = `Time: ${timer}s`;
        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = `Time: ${timer}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
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

        // Show all cards briefly, then hide them
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('flipped'); // Show the symbol
        });

        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.remove('flipped'); // Hide the cards after showing them briefly
            });
        }, 2000); // Show cards for 2 seconds before hiding them

        startTimer();
    }

    function updateMoves() {
        moves++;
        movesElement.textContent = `Moves: ${moves}`;
    }

    function checkWin() {
        const matchedCards = document.querySelectorAll('.card.matched');
        if (matchedCards.length === cards.length) {
            stopTimer();
            setTimeout(() => {
                alert(`You won in ${moves} moves and ${timer} seconds!`);
            }, 500);
        }
    }

    gameBoard.addEventListener('click', event => {
        const clickedCard = event.target.closest('.card');
        if (!clickedCard || flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

        clickedCard.classList.add('flipped'); // Show the clicked card
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            updateMoves();
            setTimeout(() => {
                if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                    flippedCards.forEach(card => card.classList.add('matched'));
                    checkWin();
                } else {
                    flippedCards.forEach(card => card.classList.remove('flipped')); // Hide the cards again if they don't match
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

    function updateDifficulty() {
        const difficulty = difficultySelector.value;
        if (difficulty === 'easy') {
            cards = [...cardSymbols, ...cardSymbols];
            gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (difficulty === 'medium') {
            cards = [...cardSymbols, ...cardSymbols, ...cardSymbols.slice(0, 4)];
            gameBoard.style.gridTemplateColumns = 'repeat(6, 1fr)';
        } else {
            cards = [...cardSymbols, ...cardSymbols, ...cardSymbols, ...cardSymbols];
            gameBoard.style.gridTemplateColumns = 'repeat(8, 1fr)';
        }
        resetGame();
    }

    difficultySelector.addEventListener('change', updateDifficulty);

    updateDifficulty(); // Initialize with the selected difficulty
});
