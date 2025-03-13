let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0;
let oWins = 0;

const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');
const xScore = document.getElementById('xScore');
const oScore = document.getElementById('oScore');

function checkWinner() {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            updateScore(currentPlayer);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        statusText.textContent = 'It\'s a Draw!';
    }
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameBoard[cellIndex] || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScore(winner) {
    if (winner === 'X') {
        xWins++;
        xScore.textContent = xWins;
    } else if (winner === 'O') {
        oWins++;
        oScore.textContent = oWins;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);