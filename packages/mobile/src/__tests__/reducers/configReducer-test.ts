import expect from 'expect';
import { configReducer } from '../../../../core/src/reducers';

describe('reducers/index.js', () => {
  describe('configReducer', () => {
    it('should handle UPDATE_THEME action', () => {
      const givenState = {
        radio: false,
        repeat: 'repeat-all',
        setup: false,
      };

      const givenAction = {
        payload: 'light',
        type: 'UPDATE_THEME',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        radio: false,
        repeat: 'repeat-all',
        setup: false,
      });
    });

    it('should handle REPEAT action', () => {
      const givenState = {
        radio: false,
        repeat: 'repeat-all',
        setup: false,
        themeType: 'dark',
      };

      const givenAction = {
        repeat: 'repeat',
        type: 'REPEAT',
      };

      const actualState = configReducer(givenState, givenAction);

      expect(actualState).toEqual({
        radio: false,
        repeat: 'repeat',
        setup: false,
        themeType: 'dark',
      });
    });
  });
});
