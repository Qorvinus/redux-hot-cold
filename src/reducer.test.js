import reducers from './reducer';
import { generateAuralUpdate, restartGame, makeGuess } from './actions';

describe('reducers', () => {
  it('Should set the initial state when nothing is passed in', () => {
        const state = reducers(undefined, {type: '__UNKNOWN'});

        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.auralStatus).toEqual('');
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducers(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('restartGame', () => {
      it('Should start a new game', () => {
        let state = {
          guesses: [ 1, 2, 3, 4, 5],
          feedback: 'Awesome',
          correctAnswer: 5
        };
        const correctAnswer = 7;
        state = reducers(state, restartGame(correctAnswer));
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toEqual(correctAnswer);
        expect(state.auralStatus).toEqual('');
      });
    })

    describe('makeGuess', () => {
      it('Should make a guess', () => {
        // Set the correctAnswer so we know what we're aiming for
        let state = {
          guesses: [],
          feedback: '',
          correctAnswer: 100
        }

        state = reducers(state, makeGuess(25));
        expect(state.guesses).toEqual([25]);
        expect(state.feedback).toEqual("You're Ice Cold...");

        state = reducers(state, makeGuess(60));
        expect(state.guesses).toEqual([25, 60]);
        expect(state.feedback).toEqual("You're Cold...");

        state = reducers(state, makeGuess(80));
        expect(state.guesses).toEqual([25, 60, 80]);
        expect(state.feedback).toEqual("You're Warm.");

        state = reducers(state, makeGuess(95));
        expect(state.guesses).toEqual([25, 60, 80, 95]);
        expect(state.feedback).toEqual("You're Hot!");

        state = reducers(state, makeGuess(100));
        expect(state.guesses).toEqual([25, 60, 80, 95, 100]);
        expect(state.feedback).toEqual('You got it!');
      });

      it('Can generate aural updates', () => {
        let state = {
          guesses: [25, 3, 90],
          feedback: "You're warm.",
          auralStatus: ''
        }

        state = reducers(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual('Here\'s the status of the game right now: You\'re Warm. You\'ve made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25');
      });
    });
})
