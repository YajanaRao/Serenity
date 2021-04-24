import expect from 'expect';
import { playerStateReducer } from '../../reducers';
import { TrackProps } from '../../utils/types';

const track: TrackProps = {
  artist: 'me',
  cover: 'url',
  id: '123',
  path: 'file',
  title: 'hi',
};

describe('reducers/index.js', () => {
  describe('playerStateReducer', () => {
    it('should handle LOAD action', () => {
      const givenState = {
        active: {},
        status: 'init',
      };

      const givenAction = {
        track,
        type: 'LOAD',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        active: track,
        status: 'init',
      });
    });

    it('should handle COMPLETED action', () => {
      const givenState = {
        active: track,
        status: 'playing',
      };

      const givenAction = {
        status: 'paused',
        type: 'COMPLETED',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        active: track,
        status: 'paused',
      });
    });
  });
});
