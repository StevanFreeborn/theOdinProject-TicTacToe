"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = '';
    const boardState = {
        squareOne: '',
        squareTwo: '',
        squareThree: '',
        squareFour: '',
        squareFive: '',
        squareSix: '',
        squareSeven: '',
        squareEight: '',
        squareNine: '',
    };
    const boardDisplay = document.getElementById('board');
    const winnerDisplay = document.getElementById('winner');
    function getCurrentPlayer({ currentPlayer }) {
        if (currentPlayer === '') {
            return 'X';
        }
        return currentPlayer === 'X' ? 'O' : 'X';
    }
    function renderBoard({ boardState, board, winnerDisplay, }) {
        if (board === null) {
            return;
        }
        board.innerHTML = '';
        for (const square in boardState) {
            const div = document.createElement('div');
            div.id = square;
            div.classList.add('square');
            div.innerText = boardState[square];
            div.addEventListener('click', e => {
                currentPlayer = getCurrentPlayer({ currentPlayer });
                placeMarker({
                    boardState,
                    marker: currentPlayer,
                    event: e,
                });
                renderBoard({ board, boardState, winnerDisplay });
                const result = checkForWinner({ boardState });
                displayWinner({ result, winnerDisplay });
            });
            board === null || board === void 0 ? void 0 : board.append(div);
        }
    }
    function displayWinner({ winnerDisplay, result, }) {
        if (result === null || winnerDisplay === null) {
            return;
        }
        if (result === 'DRAW') {
            winnerDisplay.innerText = 'It is a draw';
            return;
        }
        winnerDisplay.innerText = `${result} wins!`;
    }
    function placeMarker({ boardState, marker, event, }) {
        const square = event.target;
        const key = square.id;
        if (square.innerText !== '') {
            return;
        }
        square.innerText = marker;
        boardState[key] = marker;
    }
    function checkForWinner({ boardState, }) {
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
            const firstMark = boardState[firstPlace];
            const isWinner = sequence.every(place => {
                const currentMark = boardState[place];
                if (firstMark === '' || currentMark === '') {
                    return false;
                }
                return currentMark === firstMark;
            });
            if (isWinner) {
                return firstMark;
            }
        }
        if (Object.values(boardState).every(square => square !== '')) {
            return 'DRAW';
        }
        return null;
    }
    renderBoard({ boardState, board: boardDisplay, winnerDisplay });
});
