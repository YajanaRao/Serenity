import expect from 'expect';
import { queryReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('queryReducer', () => {
    it('should handle UPDATE_QUERY action', () => {
      const givenState = {
        message: '',
        searchResult: false,
      };

      const givenAction = {
        payload: 'search_result',
        type: 'UPDATE_QUERY',
      };

      const actualState = queryReducer(givenState, givenAction);

      expect(actualState).toEqual({
        message: '',
        searchResult: 'search_result',
      });
    });
  });
});
