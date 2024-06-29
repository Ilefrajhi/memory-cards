document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.getElementById('resetButton');
    const maxTries = 14; // Maximum allowed tries
    let tries = 0; // Counter for tries
    let flipCount = 0; // Counter for flips
    let gameOver = false; // Flag to track game over state
    let matchedPairs = 0; // Counter for matched pairs
    const numberOfPairs = 6; // Number of pairs (update this according to your pairs)

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    const images = [
        'images/360_F_115314898_3plpJZfmS75cC1Hks7tTwiyrIBlfj1Jc.jpg', 'images/360_F_115314898_3plpJZfmS75cC1Hks7tTwiyrIBlfj1Jc.jpg',
        'images/download.jpeg', 'images/download.jpeg',
        'images/images.jpeg', 'images/images.jpeg',
        'images/person-holds-lotus-flower-their-hands_883148-915.avif', 'images/person-holds-lotus-flower-their-hands_883148-915.avif',
        'images/Tulipa-White-Triumphator-RW-whitetriumphatorarundelcastle3-469839e.jpg', 'images/Tulipa-White-Triumphator-RW-whitetriumphatorarundelcastle3-469839e.jpg',
        'images/2ecf067a2069128f44d75d25a32e219e.jpg', 'images/2ecf067a2069128f44d75d25a32e219e.jpg',
    ];

    // Function to create the game board
    function createBoard() {
        // Clear game board
        gameBoard.innerHTML = '';
        cards = [];

        // Shuffle images array
        images.sort(() => 0.5 - Math.random());

        // Create card elements
        images.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const imgElement = document.createElement('img');
            imgElement.src = image; // Use image path directly

            card.appendChild(imgElement);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    // Function to flip a card
    function flipCard() {
        if (lockBoard || gameOver) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            lockBoard = true;
            tries++; // Increment tries counter
            flipCount++; // Increment flip count
            updateFlipCount(); // Update flip count display
            checkForMatch();
        }
    }

    // Function to check for a match
    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;

        if (isMatch) {
            disableCards();
            matchedPairs++;
            checkGameStatus();
        } else {
            unflipCards();
        }
    }

    // Function to disable matching cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    // Function to unflip non-matching cards
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    // Function to reset the board
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Function to check game status (win/lose)
    function checkGameStatus() {
        if (matchedPairs === numberOfPairs) {
            displayResult('Winner! Flips: ' + flipCount + ', Tries: ' + tries);
            gameOver = true; // Set game over flag
        } else if (flipCount >= maxTries) {
            displayResult('Game over, try again!');
            gameOver = true; // Set game over flag
        }
    }

    // Function to display game result
    function displayResult(message) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        if (message.includes('Winner')) {
            resultDiv.classList.add('winner');
        } else if (message.includes('Game over')) {
            resultDiv.classList.add('game-over');
        }

        resultDiv.textContent = message;
        document.body.appendChild(resultDiv);
    }

    // Function to update flip count display
    function updateFlipCount() {
        document.getElementById('flipCount').textContent = 'Flips: ' + flipCount;
    }

    // Function to reset the game
    function resetGame() {
        tries = 0; // Reset tries counter
        flipCount = 0; // Reset flip count
        gameOver = false; // Reset game over flag
        matchedPairs = 0; // Reset matched pairs
        firstCard = null; // Reset first card
        secondCard = null; // Reset second card
        lockBoard = false; // Unlock the board
        document.getElementById('flipCount').textContent = ''; // Clear flip count display
        document.querySelectorAll('.result').forEach(el => el.remove()); // Remove any existing result messages
        createBoard(); // Restart the game
    }

    // Initialize the game board on page load
    createBoard();

    // Reset game function on button click
    resetButton.addEventListener('click', () => {
        resetGame();
    });
});

 /* document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refreshButton');

    refreshButton.addEventListener('click', () => {
        location.reload(); // This will refresh the page
    });
});
*/
