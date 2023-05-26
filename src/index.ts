type Marker = '' | 'X' | 'O';
type Board = { [key: string]: Marker };

document.addEventListener('DOMContentLoaded', () => {
  let currentPlayer = '';

  const boardSquares: Board = {
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

  function getCurrentPlayer({ currentPlayer }: { currentPlayer: string }) {
    if (currentPlayer === '') {
      return 'X';
    }

    return currentPlayer === 'X' ? 'O' : 'X';
  }

  function renderBoard({
    boardSquares,
    board,
  }: {
    boardSquares: Board;
    board: HTMLElement | null;
  }) {
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
          marker: currentPlayer as Marker,
          event: e,
        });
        renderBoard({ board, boardSquares });
        const result = checkForWinner({ boardSquares });
        displayWinner({ result });
      });
      board?.append(div);
    }
  }

  function displayWinner({ result }: { result: string | null }) {
    if (result === null) {
      return;
    }

    if (result === 'DRAW') {
      console.log('It is a draw');
      return;
    }

    console.log(`${result} wins!`);
  }

  function placeMarker({
    boardSquares,
    marker,
    event,
  }: {
    boardSquares: Board;
    marker: Marker;
    event: MouseEvent;
  }) {
    const square = event.target as HTMLDivElement;
    const key = square.id as Marker;

    if (square.innerText !== '') {
      return;
    }

    square.innerText = marker;
    boardSquares[key] = marker;
  }

  function checkForWinner({
    boardSquares,
  }: {
    boardSquares: Board;
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

      const isWinner = sequence.every(place => {
        const firstMark = boardSquares[firstPlace];
        const currentMark = boardSquares[place];

        if (firstMark === '' || currentMark === '') {
          return false;
        }

        return currentMark === firstMark;
      });

      if (isWinner) {
        return firstPlace as Marker;
      }
    }

    if (Object.values(boardSquares).every(square => square !== '')) {
      return 'DRAW';
    }

    return null;
  }

  renderBoard({ boardSquares, board });
});
