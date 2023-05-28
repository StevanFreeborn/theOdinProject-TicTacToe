import { Marker, RenderParams, State } from './types.js';

export function game({ state }: { state: State }) {
  let gameState: State = { ...state };

  function updateCurrentPlayer() {
    if (gameState.winner !== '') {
      return;
    }

    gameState = {
      ...gameState,
      currentPlayer: gameState.currentPlayer === Marker.O ? Marker.X : Marker.O,
    };
  }

  function updateBoard({ event }: { event: MouseEvent }) {
    const square = event.target as HTMLDivElement;
    const key = square.id;

    if (
      square.innerText !== Marker.Empty ||
      gameState.winner !== Marker.Empty
    ) {
      return;
    }

    gameState = {
      ...gameState,
      board: {
        ...gameState.board,
        [key]: gameState.currentPlayer as Marker,
      },
    };
  }

  function updateWinner() {
    if (gameState.winner !== Marker.Empty) {
      return;
    }

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

        if (firstMark === Marker.Empty || currentMark === Marker.Empty) {
          return false;
        }

        return currentMark === firstMark;
      });

      if (isWinner) {
        gameState = {
          ...gameState,
          winner: `Winner: ${firstMark}`,
        };
      }
    }

    if (
      Object.values(gameState.board).every(square => square !== Marker.Empty)
    ) {
      gameState = {
        ...gameState,
        winner: 'DRAW',
      };
    }
  }

  function render({
    boardDisplay,
    winnerDisplay,
    currentPlayerDisplay,
    squareClickHandler,
  }: RenderParams) {
    if (
      boardDisplay === null ||
      winnerDisplay === null ||
      currentPlayerDisplay === null
    ) {
      return;
    }

    boardDisplay.innerHTML = '';
    winnerDisplay.innerHTML = '';
    currentPlayerDisplay.innerHTML = '';

    for (const square in gameState.board) {
      const div = document.createElement('div');
      div.id = square;
      div.classList.add('square');
      div.innerText = gameState.board[square];
      div.addEventListener('click', squareClickHandler);
      boardDisplay.append(div);
    }

    if (gameState.winner === Marker.Empty) {
      currentPlayerDisplay.innerText = `${gameState.currentPlayer}'s move.`;
    } else {
      currentPlayerDisplay.innerText = '';
    }

    winnerDisplay.innerText = gameState.winner;
  }

  return {
    getState: () => gameState,
    updateCurrentPlayer,
    updateBoard,
    updateWinner,
    render,
  };
}
