export declare function game({ state }: {
    state: State;
}): {
    getState: () => {
        board: {
            [key: string]: Marker;
        };
        currentPlayer: string;
        winner: string;
    };
    updateCurrentPlayer: () => void;
    updateBoard: ({ event }: {
        event: MouseEvent;
    }) => void;
    updateWinner: () => void;
    render: ({ boardDisplay, winnerDisplay, currentPlayerDisplay, squareClickHandler, }: RenderParams) => void;
};
