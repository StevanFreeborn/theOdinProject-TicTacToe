type Marker = '' | 'X' | 'O';

type Board = { [key: string]: Marker };

type State = {
  board: { [key: string]: Marker };
  currentPlayer: string;
  winner: string;
};

type RenderParams = {
  boardDisplay: HTMLElement | null;
  currentPlayerDisplay?: HTMLElement | null;
  winnerDisplay: HTMLElement | null;
  squareClickHandler: (e: MouseEvent) => void;
};
