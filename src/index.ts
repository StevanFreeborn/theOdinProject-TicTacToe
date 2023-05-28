import { game } from './game.js';
import { Marker, State } from './types.js';

document.addEventListener('DOMContentLoaded', () => {
  const state: State = {
    board: {
      squareOne: Marker.Empty,
      squareTwo: Marker.Empty,
      squareThree: Marker.Empty,
      squareFour: Marker.Empty,
      squareFive: Marker.Empty,
      squareSix: Marker.Empty,
      squareSeven: Marker.Empty,
      squareEight: Marker.Empty,
      squareNine: Marker.Empty,
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
