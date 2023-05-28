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
});
//# sourceMappingURL=game.spec.js.map