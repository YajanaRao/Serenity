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
        type: 'UPDATE_QUERY',
        payload: 'search_result',
      };

      const actualState = queryReducer(givenState, givenAction);

      expect(actualState).toEqual({
        searchResult: 'search_result',
        message: '',
      });
    });
  });
});
