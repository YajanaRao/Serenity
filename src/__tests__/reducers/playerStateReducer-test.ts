import expect from 'expect';
import { playerStateReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('playerStateReducer', () => {
    it('should handle LOAD action', () => {
      const givenState = {
        status: 'paused',
        active: 'track_1',
      };

      const givenAction = {
        type: 'LOAD',
        status: 'playing',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        status: 'playing',
        active: 'track_2',
      });
    });

    it('should handle COMPLETED action', () => {
      const givenState = {
        status: 'init',
        active: 'track',
      };

      const givenAction = {
        type: 'COMPLETED',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        status: 'paused',
        active: 'track',
      });
    });
  });
});
