document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const resetButton = document.getElementById('resetButton');
    const maxTries = 19; // Maximum allowed tries
    let tries = 0; // Counter for tries
    let flipCount = 0; // Counter for flips
    let gameOver = false; // Flag to track game over state
    let count = 0; // Counter for matched pairs
    let matchedPairs = 0; // Counter for matched pairs

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;


    const images = [
        'images/animals_images/cat.jpeg', 'images/animals_images/cat.jpeg',
        'images/animals_images/cute-baby-koala-natural-habitat-australian-animal-3d-rendering-cartoon-illustration_691560-4299.avif', 'images/animals_images/cute-baby-koala-natural-habitat-australian-animal-3d-rendering-cartoon-illustration_691560-4299.avif',
        'images/animals_images/dog.jpeg', 'images/animals_images/dog.jpeg',
        'images/animals_images/ia.jpeg', 'images/animals_images/ia.jpeg',
        'images/animals_images/images (1).jpeg', 'images/animals_images/images (1).jpeg',
        'images/animals_images/images.jpeg', 'images/animals_images/images.jpeg',
        'images/animals_images/portrait-beautiful-cheetah-namibia-africa-260nw-2031590879.webp', 'images/animals_images/portrait-beautiful-cheetah-namibia-africa-260nw-2031590879.webp',
        'images/animals_images/rabbit.jpeg', 'images/animals_images/rabbit.jpeg'
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
            count = matchedPairs; // Update count with matched pairs
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
        if (count === 8 && flipCount <= maxTries) {
            displayResult('Winner! Flips: ' + flipCount + ', Tries: ' + tries);
            gameOver = true; // Set game over flag
        } else if (count < 8 && flipCount >= maxTries) {
            displayResult('Game over, try again!');
            gameOver = true; // Set game over flag
            resetBoard();
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
