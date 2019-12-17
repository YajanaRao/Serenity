import expect from 'expect';
import { mediaStoreReducer } from '../../reducers';

describe('reducers/index.js', () => {
  describe('mediaStoreReducer', () => {
    it('should handle OFFLINE_SONGS action', () => {
      const givenState = {
        songs: ['some_songs'],
      };

      const givenAction = {
        payload: ['offline_songs'],
        type: 'OFFLINE_SONGS',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        songs: ['offline_songs'],
      });
    });

    it('should handle OFFLINE_ARTISTS action', () => {
      const givenState = {
        artists: ['some_artists'],
      };

      const givenAction = {
        payload: ['offline_artists'],
        type: 'OFFLINE_ARTISTS',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        artists: ['offline_artists'],
      });
    });

    it('should handle OFFLINE_ALBUMS action', () => {
      const givenState = {
        albums: ['some_albums'],
      };

      const givenAction = {
        type: 'OFFLINE_ALBUMS',
        payload: ['offline_albums'],
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        albums: ['offline_albums'],
      });
    });

    it('should handle OFFLINE_FILES action', () => {
      const givenState = {
        files: ['some_files'],
      };

      const givenAction = {
        payload: ['offline_files'],
        type: 'OFFLINE_FILES',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        files: ['offline_files'],
      });
    });
  });
});
