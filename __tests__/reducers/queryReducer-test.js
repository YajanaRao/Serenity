import expect from 'expect'
import { queryReducer } from '../../src/reducers'

describe('reducers/index.js', () => {
  describe('queryReducer', () => {
    it('should handle UPDATE_QUERY action', () => {
      const givenState = {
      }

      const givenAction = {
        type: 'UPDATE_QUERY',
        payload: 'search_result'
      }

      const actualState = queryReducer(givenState, givenAction)

      expect(actualState).toEqual({
        searchResult: 'search_result'
      })
    })
  })
})
