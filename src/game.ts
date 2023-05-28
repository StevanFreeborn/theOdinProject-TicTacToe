export function game({ state }: { state: State }) {
  let gameState = { ...state };

  function updateCurrentPlayer() {
    if (gameState.winner !== '') {
      return;
    }

    gameState = {
      ...gameState,
      currentPlayer: gameState.currentPlayer === 'O' ? 'X' : 'O',
    };
  }

  function updateBoard({ event }: { event: MouseEvent }) {
    const square = event.target as HTMLDivElement;
    const key = square.id;

    if (square.innerText !== '' || gameState.winner !== '') {
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
    if (gameState.winner !== '') {
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

        if (firstMark === '' || currentMark === '') {
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

    if (gameState.winner === '') {
      currentPlayerDisplay.innerText = `${gameState.currentPlayer}'s move.`;
    } else {
      currentPlayerDisplay.innerText = '';
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
