import { expect } from 'chai';
import { game } from '../src/game';
import { Marker } from '../src/types';

describe('game', function () {
  describe('updateCurrentPlayer', function () {
    it('should not update the current player if there is winner', function () {
      const state = {
        board: {},
        currentPlayer: 'O',
        winner: 'X',
      };

      const { getState, updateCurrentPlayer } = game({ state });

      updateCurrentPlayer();

      expect(getState().currentPlayer).to.be.equal('O');
    });

    it('should update the current player to X if current player is 0 and there is no winner', function () {
      const state = {
        board: {},
        currentPlayer: 'O',
        winner: '',
      };

      const { getState, updateCurrentPlayer } = game({ state });
      updateCurrentPlayer();

      expect(getState().currentPlayer).to.be.equal('X');
    });

    it('should update the current player to O if current player is X and there is no winner', function () {
      const state = {
        board: {},
        currentPlayer: 'X',
        winner: '',
      };

      const { getState, updateCurrentPlayer } = game({ state });
      updateCurrentPlayer();

      expect(getState().currentPlayer).to.be.equal('O');
    });
  });

  describe('updateBoard', function () {
    it('should not update the board when there is a winner', function () {
      const board = {};

      const state = {
        board,
        currentPlayer: 'O',
        winner: 'X',
      };

      const square = document.createElement('div');
      square.id = 'id';
      square.innerText = '';
      const event = new MouseEvent('click');
      square.dispatchEvent(event);

      const { getState, updateBoard } = game({ state });

      updateBoard({ event });

      expect(getState().board).to.be.deep.equal(board);
    });

    it('should not update the board when there is already a marker in the square', function () {
      const board = {};

      const state = {
        board,
        currentPlayer: 'O',
        winner: '',
      };

      const square = document.createElement('div');
      square.id = 'id';
      square.innerText = 'X';
      const event = new MouseEvent('click');
      square.dispatchEvent(event);

      const { getState, updateBoard } = game({ state });

      updateBoard({ event });

      expect(getState().board).to.be.deep.equal(board);
    });

    it('should update the board when square is empty and no winner', function () {
      const board = {};

      const state = {
        board,
        currentPlayer: 'O',
        winner: '',
      };

      const square = document.createElement('div');
      square.id = 'squareTwo';
      square.innerText = '';
      const event = new MouseEvent('click');
      square.dispatchEvent(event);

      const { getState, updateBoard } = game({ state });

      updateBoard({ event });

      expect(getState().board).to.be.deep.equal({
        [square.id]: state.currentPlayer,
      });
    });
  });

  describe('updateWinner', function () {
    it('should not update winner if game has already been won', function () {
      const state = {
        board: {},
        currentPlayer: '0',
        winner: 'X',
      };

      const { getState, updateWinner } = game({ state });

      updateWinner();

      expect(getState().winner).to.be.equal(state.winner);
    });

    it('should not update winner if no winning sequences are on board', function () {
      const state = {
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
        currentPlayer: '0',
        winner: '',
      };

      const { getState, updateWinner } = game({ state });

      updateWinner();

      expect(getState().winner).to.be.equal(state.winner);
    });

    it('should update winner if winning sequence is on board', function () {
      const state = {
        board: {
          squareOne: Marker.X,
          squareTwo: Marker.X,
          squareThree: Marker.X,
          squareFour: Marker.Empty,
          squareFive: Marker.Empty,
          squareSix: Marker.Empty,
          squareSeven: Marker.Empty,
          squareEight: Marker.Empty,
          squareNine: Marker.Empty,
        },
        currentPlayer: '0',
        winner: '',
      };

      const { getState, updateWinner } = game({ state });

      updateWinner();

      expect(getState().winner).to.be.equal(`Winner: ${Marker.X}`);
    });
  });

  describe('reset', function () {
    it('should set the game state back to the original state passed at the start of the game', function () {
      const state = {
        currentPlayer: 'O',
        winner: '',
        board: {},
      };

      const { getState, updateCurrentPlayer, reset } = game({ state });

      updateCurrentPlayer();
      reset();

      expect(getState()).to.be.deep.equal(state);
    });
  });
});
