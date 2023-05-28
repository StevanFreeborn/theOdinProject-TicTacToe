import { expect } from 'chai';
import { game } from '../src/game';

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
  });
});
