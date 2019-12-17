import expect from 'expect';
import { playerStateReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('playerStateReducer', () => {
    it('should handle LOAD action', () => {
      const givenState = {
        active: 'track_1',
        status: 'paused',
      };

      const givenAction = {
        status: 'playing',
        type: 'LOAD',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        active: 'track_2',
        status: 'playing',
      });
    });

    it('should handle COMPLETED action', () => {
      const givenState = {
        active: 'track',
        status: 'init',
      };

      const givenAction = {
        type: 'COMPLETED',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        active: 'track',
        status: 'paused',
      });
    });
  });
});
