import expect from 'expect';
import { configReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('configReducer', () => {
    it('should handle UPDATE_THEME action', () => {
      const givenState = {
        radio: false,
        repeat: 'repeat-all',
        setup: false,
        themeType: 'dark',
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
        themeType: 'light',
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
