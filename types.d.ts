type Marker = '' | 'X' | 'O';

type State = {
  board: { [key: string]: Marker };
  currentPlayer: string;
  winner: string;
};

type RenderParams = {
  boardDisplay: HTMLElement | null;
  currentPlayerDisplay: HTMLElement | null;
  winnerDisplay: HTMLElement | null;
  squareClickHandler: (e: MouseEvent) => void;
};

type Game = {
  updateCurrentPlayer: () => void;
  updateBoard: ({ event }: { event: MouseEvent }) => void;
  updateWinner: () => void;
  render: ({
    boardDisplay,
    winnerDisplay,
    currentPlayerDisplay,
    squareClickHandler,
  }: RenderParams) => void;
};
