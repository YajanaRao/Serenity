import expect from 'expect';
import { configReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('configReducer', () => {
    it('should handle UPDATE_THEME action', () => {
      const givenState = {};

      const givenAction = {
        payload: 'themeType',
        type: 'UPDATE_THEME',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        themeType: 'themeType',
      });
    });

    it('should handle REPEAT action', () => {
      const givenState = {};

      const givenAction = {
        repeat: 'repeat',
        type: 'REPEAT',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        repeat: 'repeat',
      });
    });
  });
});
