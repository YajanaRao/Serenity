import expect from 'expect'
import { mediaStoreReducer } from '../../src/reducers'

describe('reducers/index.js', () => {
  describe('mediaStoreReducer', () => {
    it('should handle DOWNLOAD action', () => {
      const givenState = {
        songs: [ { title: 'existing_song' } ],
      }

      const givenAction = {
        type: 'DOWNLOAD',
        payload: {
          title: 'song_title',

        }
      }

      const actualState = mediaStoreReducer(givenState, givenAction)

      expect(actualState).toEqual({
        songs: [
          { title: 'song_title' },
          { title: 'existing_song' }
        ],
        result: 'song_title downloaded successfully'
      })
    })

    it('should handle OFFLINE_SONGS action', () => {
      const givenState = {
        songs: [ 'some_songs' ],
      }

      const givenAction = {
        type: 'OFFLINE_SONGS',
        payload: [ 'offline_songs' ]
      }

      const actualState = mediaStoreReducer(givenState, givenAction)

      expect(actualState).toEqual({
        songs: [ 'offline_songs' ],
      })
    })

    it('should handle OFFLINE_ARTISTS action', () => {
      const givenState = {
        artists: [ 'some_artists' ],
      }

      const givenAction = {
        type: 'OFFLINE_ARTISTS',
        payload: [ 'offline_artists' ]
      }

      const actualState = mediaStoreReducer(givenState, givenAction)

      expect(actualState).toEqual({
        artists: [ 'offline_artists' ],
      })
    })

    it('should handle OFFLINE_ALBUMS action', () => {
      const givenState = {
        albums: [ 'some_albums' ],
      }

      const givenAction = {
        type: 'OFFLINE_ALBUMS',
        payload: [ 'offline_albums' ]
      }

      const actualState = mediaStoreReducer(givenState, givenAction)

      expect(actualState).toEqual({
        albums: [ 'offline_albums' ],
      })
    })

    it('should handle OFFLINE_FILES action', () => {
      const givenState = {
        files: [ 'some_files' ],
      }

      const givenAction = {
        type: 'OFFLINE_FILES',
        payload: [ 'offline_files' ]
      }

      const actualState = mediaStoreReducer(givenState, givenAction)

      expect(actualState).toEqual({
        files: [ 'offline_files' ],
      })
    })
  })
})
