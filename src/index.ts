type Marker = '' | 'X' | 'O';
type Board = { [key: string]: Marker };

document.addEventListener('DOMContentLoaded', () => {
  let currentPlayer = '';

  const boardState: Board = {
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

  function getCurrentPlayer({ currentPlayer }: { currentPlayer: string }) {
    if (currentPlayer === '') {
      return 'X';
    }

    return currentPlayer === 'X' ? 'O' : 'X';
  }

  function renderBoard({
    boardState,
    board,
    winnerDisplay,
  }: {
    boardState: Board;
    board: HTMLElement | null;
    winnerDisplay: HTMLElement | null;
  }) {
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
          marker: currentPlayer as Marker,
          event: e,
        });
        renderBoard({ board, boardState, winnerDisplay });
        const result = checkForWinner({ boardState });
        displayWinner({ result, winnerDisplay });
      });
      board?.append(div);
    }
  }

  function displayWinner({
    winnerDisplay,
    result,
  }: {
    winnerDisplay: HTMLElement | null;
    result: string | null;
  }) {
    if (result === null || winnerDisplay === null) {
      return;
    }

    if (result === 'DRAW') {
      winnerDisplay.innerText = 'It is a draw';
      return;
    }

    winnerDisplay.innerText = `${result} wins!`;
  }

  function placeMarker({
    boardState,
    marker,
    event,
  }: {
    boardState: Board;
    marker: Marker;
    event: MouseEvent;
  }) {
    const square = event.target as HTMLDivElement;
    const key = square.id as Marker;

    if (square.innerText !== '') {
      return;
    }

    square.innerText = marker;
    boardState[key] = marker;
  }

  function checkForWinner({
    boardState,
  }: {
    boardState: Board;
  }): '' | 'X' | 'O' | 'DRAW' | null {
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
