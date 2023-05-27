import { game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const state: State = {
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
    currentPlayer: 'X',
    winner: '',
  };

  const boardDisplay = document.getElementById('board');
  const winnerDisplay = document.getElementById('winner');
  const currentPlayerDisplay = document.getElementById('currentPlayer');

  const { render, updateCurrentPlayer, updateBoard, updateWinner } = game({
    state,
  });

  function handleSquareClick(event: MouseEvent) {
    updateBoard({ event });
    updateCurrentPlayer();
    updateWinner();
    render({
      boardDisplay,
      winnerDisplay,
      currentPlayerDisplay,
      squareClickHandler: handleSquareClick,
    });
  }

  render({
    boardDisplay,
    winnerDisplay,
    currentPlayerDisplay,
    squareClickHandler: handleSquareClick,
  });
});
