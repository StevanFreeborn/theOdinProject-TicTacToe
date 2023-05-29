export enum Marker {
  X = 'X',
  O = 'O',
  Empty = '',
}

export type State = {
  board: { [key: string]: Marker };
  currentPlayer: string;
  winner: string;
};

export type RenderParams = {
  boardDisplay: HTMLElement | null;
  currentPlayerDisplay: HTMLElement | null;
  winnerDisplay: HTMLElement | null;
  squareClickHandler: (e: MouseEvent) => void;
  resetButtonClickHandler: (e: MouseEvent) => void;
};

export type Game = {
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
