import expect from 'expect';
import { configReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('configReducer', () => {
    it('should handle UPDATE_THEME action', () => {
      const givenState = {};

      const givenAction = {
        type: 'UPDATE_THEME',
        payload: 'themeType',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        themeType: 'themeType',
      });
    });

    it('should handle REPEAT action', () => {
      const givenState = {};

      const givenAction = {
        type: 'REPEAT',
        repeat: 'repeat',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        repeat: 'repeat',
      });
    });
  });
});
