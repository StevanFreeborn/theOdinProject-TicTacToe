import { game } from './game.js';
document.addEventListener('DOMContentLoaded', () => {
    const state = {
        board: {
            squareOne: '',
            squareTwo: '',
            squareThree: '',
            squareFour: '',
            squareFive: '',
            squareSix: '',
            squareSeven: '',
            squareEight: '',
            squareNine: '',
        },
        currentPlayer: '',
        winner: '',
    };
    const boardDisplay = document.getElementById('board');
    const winnerDisplay = document.getElementById('winner');
    const { render, updateCurrentPlayer, updateBoard, updateWinner } = game({
        state,
    });
    function handleSquareClick(event) {
        updateCurrentPlayer();
        updateBoard({ event });
        updateWinner();
        render({
            boardDisplay,
            winnerDisplay,
            squareClickHandler: handleSquareClick,
        });
    }
    render({
        boardDisplay,
        winnerDisplay,
        squareClickHandler: handleSquareClick,
    });
});
