export function game({ state }: { state: State }) {
  let gameState = { ...state };

  function updateCurrentPlayer() {
    const updatedState = { ...gameState };

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

  function updateBoard({ event }: { event: MouseEvent }) {
    const square = event.target as HTMLDivElement;
    const key = square.id;

    if (square.innerText !== '') {
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
        gameState = {
          ...gameState,
          winner: firstMark,
        };
      }
    }

    if (Object.values(gameState.board).every(square => square !== '')) {
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
