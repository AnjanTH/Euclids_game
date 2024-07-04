let board = [];
let currentPlayer = 1;
let player1Name = "";
let player2Name = "";

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function isOnBoard(number) {
    return board.includes(number);
}

function startGame() {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    player1Name = prompt("Enter Player 1 name:");
    player2Name = prompt("Enter Player 2 name:");

    if (num1 <= 0 || num2 <= 0 || num1 === num2 || !player1Name || !player2Name) {
        alert('Please enter two unequal positive integers and both player names.');
        return;
    }

    board = [num1, num2];
    currentPlayer = 1;

    document.getElementById('current-player').textContent = `Current Player: ${player1Name}`;
    document.getElementById('message').textContent = '';
    updateBoard();
}

function updateBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';

    board.forEach(num => {
        const numDiv = document.createElement('div');
        numDiv.textContent = num;
        boardDiv.appendChild(numDiv);
    });
}

function makeMove(player) {
    let currentPlayerName = (currentPlayer === 1) ? player1Name : player2Name;

    if (player !== currentPlayer) {
        alert(`It's ${currentPlayerName}'s turn!`);
        return;
    }

    let moveMade = false;

    for (let i = 0; i < board.length; i++) {
        for (let j = i + 1; j < board.length; j++) {
            const diff = Math.abs(board[i] - board[j]);
            if (diff > 0 && !isOnBoard(diff)) {
                board.push(diff);
                moveMade = true;
                break;
            }
        }
        if (moveMade) break;
    }

    if (!moveMade) {
        document.getElementById('message').textContent = `${currentPlayerName} cannot move and loses the game.`;
    } else {
        currentPlayer = 3 - currentPlayer;
        let nextPlayerName = (currentPlayer === 1) ? player1Name : player2Name;
        document.getElementById('current-player').textContent = `Current Player: ${nextPlayerName}`;
        updateBoard();
    }
}
