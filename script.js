const Player = (mark) => {
    return { mark }
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getIndex = (e) => e.target.dataset.index;
    const putMark = (e) => e.target.textContent = gameController.currentPlayer;
    
    return {
        board,
        getIndex,
        putMark,
    };
})();

const displayController = (() => {
    const statusText = document.querySelector('#statusText');

    const setMessage = (message) => statusText.textContent = message;
    const render = () => {
        for (let i = 0; i < gameBoard.board.length; i++) {
            cells[i].textContent = gameBoard.board[i];
        }
    };
    
    return {
        setMessage,
        render,
    };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let currentPlayer
    let running = false;

    const restartBtn = document.querySelector('#restartBtn');

    const initializeGame = () => {
        running = true;
        currentPlayer = playerX.mark;
        displayController.setMessage(currentPlayer + "'s turn");
        cells.forEach((cell) => {
            cell.addEventListener('click', cellClicked, { once: true });
        });
        restartBtn.addEventListener('click', restartGame);
    }
    const cellClicked = (e) => {
        gameBoard.putMark(e);
        gameBoard.board[gameBoard.getIndex(e)] = currentPlayer;
        displayController.render(); 
        checkWinner();
        changePlayer();
    }
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < winningCombinations.length; i++) {
            const combination = winningCombinations[i];
            const cellA = gameBoard.board[combination[0]];
            const cellB = gameBoard.board[combination[1]];
            const cellC = gameBoard.board[combination[2]];
            
            if (cellA == '' || cellB == '' || cellC == '') {
                continue;
            }
    
            if (cellA == cellB && cellB == cellC) {
                displayController.setMessage(currentPlayer + " wins!");
                cells.forEach(cell => {
                    cell.removeEventListener('click', cellClicked, { once: true });
                });
                running = false;
                break;
            }
    
            if (!gameBoard.board.includes("")) {
                running = false;
                displayController.setMessage("Draw")
            }
        }
    }
    const changePlayer = () => {
        if (!running) return;
        currentPlayer = currentPlayer == playerX.mark ? playerO.mark : playerX.mark;
        displayController.setMessage(currentPlayer + "'s turn");
    }
    const restartGame = () => {
        gameBoard.board = ["", "", "", "", "", "", "", "", ""];
        displayController.render();
        initializeGame();
    }

    return {
        currentPlayer,
        initializeGame,
    };
})();

const cells = document.querySelectorAll('.cell');

gameController.initializeGame();