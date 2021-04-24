import expect from 'expect';
import { mediaStoreReducer } from '../../reducers';
import { TrackProps, ArtistProps, AlbumProps } from '../../utils/types';

const track: TrackProps = {
  artist: 'me',
  cover: 'url',
  id: '123',
  path: 'file',
  title: 'hi',
};

const artist: ArtistProps = {
  id: '123',
  name: 'artist',
};

const album: AlbumProps = {
  id: '123',
  name: 'album',
};
describe('reducers/index.js', () => {
  describe('mediaStoreReducer', () => {
    it('should handle OFFLINE_SONGS action', () => {
      const givenState = {
        albums: [],
        artists: [],
        songs: [],
      };

      const givenAction = {
        payload: [track],
        type: 'OFFLINE_SONGS',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        albums: [],
        artists: [],
        songs: [track],
      });
    });

    it('should handle OFFLINE_ARTISTS action', () => {
      const givenState = {
        albums: [],
        artists: [],
        songs: [],
      };

      const givenAction = {
        payload: [artist],
        type: 'OFFLINE_ARTISTS',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        albums: [],
        artists: [artist],
        songs: [],
      });
    });

    it('should handle OFFLINE_ALBUMS action', () => {
      const givenState = {
        albums: [],
        artists: [],
        songs: [],
      };

      const givenAction = {
        payload: [album],
        type: 'OFFLINE_ALBUMS',
      };

      const actualState = mediaStoreReducer(givenState, givenAction);

      expect(actualState).toEqual({
        albums: [album],
        artists: [],
        songs: [],
      });
    });
  });
});
