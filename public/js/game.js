export function game({ state }) {
    let gameState = Object.assign({}, state);
    function updateCurrentPlayer() {
        const updatedState = Object.assign({}, gameState);
        switch (gameState.currentPlayer) {
            case 'O':
                updatedState.currentPlayer = 'X';
                break;
            default:
                updatedState.currentPlayer = 'O';
                break;
        }
        gameState = updatedState;
    }
    function updateBoard({ event }) {
        const square = event.target;
        const key = square.id;
        if (square.innerText !== '') {
            return;
        }
        gameState = Object.assign(Object.assign({}, gameState), { board: Object.assign(Object.assign({}, gameState.board), { [key]: gameState.currentPlayer }) });
    }
    function updateWinner() {
        const winningSequences = [
            ['squareOne', 'squareTwo', 'squareThree'],
            ['squareFour', 'squareFive', 'squareSix'],
            ['squareSeven', 'squareEight', 'squareNine'],
            ['squareOne', 'squareFour', 'squareSeven'],
            ['squareTwo', 'squareFive', 'squareEight'],
            ['squareThree', 'squareSix', 'squareNine'],
            ['squareOne', 'squareFive', 'squareNine'],
            ['squareThree', 'squareFive', 'squareSeven'],
        ];
        for (const sequence of winningSequences) {
            const firstPlace = sequence[0];
            const firstMark = gameState.board[firstPlace];
            const isWinner = sequence.every(place => {
                const currentMark = gameState.board[place];
                if (firstMark === '' || currentMark === '') {
                    return false;
                }
                return currentMark === firstMark;
            });
            if (isWinner) {
                gameState = Object.assign(Object.assign({}, gameState), { winner: firstMark });
            }
        }
        if (Object.values(gameState.board).every(square => square !== '')) {
            gameState = Object.assign(Object.assign({}, gameState), { winner: 'DRAW' });
        }
    }
    function render({ boardDisplay, winnerDisplay, currentPlayerDisplay, squareClickHandler, }) {
        if (boardDisplay === null || winnerDisplay === null) {
            return;
        }
        boardDisplay.innerHTML = '';
        winnerDisplay.innerHTML = '';
        for (const square in gameState.board) {
            const div = document.createElement('div');
            div.id = square;
            div.classList.add('square');
            div.innerText = gameState.board[square];
            div.addEventListener('click', squareClickHandler);
            boardDisplay.append(div);
        }
        winnerDisplay.innerText = gameState.winner;
    }
    return {
        updateCurrentPlayer,
        updateBoard,
        updateWinner,
        render,
    };
}
