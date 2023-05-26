"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = '';
    const boardSquares = {
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
    const board = document.getElementById('board');
    function getCurrentPlayer({ currentPlayer }) {
        if (currentPlayer === '') {
            return 'X';
        }
        return currentPlayer === 'X' ? 'O' : 'X';
    }
    function renderBoard({ boardSquares, board, }) {
        if (board === null) {
            return;
        }
        board.innerHTML = '';
        for (const square in boardSquares) {
            const div = document.createElement('div');
            div.id = square;
            div.classList.add('square');
            div.innerText = boardSquares[square];
            div.addEventListener('click', e => {
                currentPlayer = getCurrentPlayer({ currentPlayer });
                placeMarker({
                    boardSquares,
                    marker: currentPlayer,
                    event: e,
                });
                renderBoard({ board, boardSquares });
                const result = checkForWinner({ boardSquares });
                displayWinner({ result });
            });
            board === null || board === void 0 ? void 0 : board.append(div);
        }
    }
    function displayWinner({ result }) {
        if (result === null) {
            return;
        }
        if (result === 'DRAW') {
            console.log('It is a draw');
            return;
        }
        console.log(`${result} wins!`);
    }
    function placeMarker({ boardSquares, marker, event, }) {
        const square = event.target;
        const key = square.id;
        if (square.innerText !== '') {
            return;
        }
        square.innerText = marker;
        boardSquares[key] = marker;
    }
    function checkForWinner({ boardSquares, }) {
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
            const isWinner = sequence.every(place => {
                const firstMark = boardSquares[firstPlace];
                const currentMark = boardSquares[place];
                if (firstMark === '' || currentMark === '') {
                    return false;
                }
                return currentMark === firstMark;
            });
            if (isWinner) {
                return firstPlace;
            }
        }
        if (Object.values(boardSquares).every(square => square !== '')) {
            return 'DRAW';
        }
        return null;
    }
    renderBoard({ boardSquares, board });
});
