import expect from 'expect'
import { playerStateReducer } from '../../src/reducers'

jest.unmock('lodash')
const lodash = require.requireActual('lodash')

describe('reducers/index.js', () => {
  describe('playerStateReducer', () => {
    it('should handle DOWNLOAD action', () => {
      const givenState = {
        status: 'init',
      }

      const givenAction = {
        type: 'STATUS',
        status: 'new_status'
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        status: 'new_status'
      })
    })

    it('should handle LOAD action', () => {
      const givenState = {
        status: 'paused',
        active: 'track_1'
      }

      const givenAction = {
        type: 'LOAD',
        status: 'playing',
        track: 'track_2'
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        status: 'playing',
        active: 'track_2'
      })
    })

    describe('NEXT action', () => {
      it('should go to the next track when there is one', () => {
        const givenState = {
          status: 'paused',
          active: 'current_track',
          history: [ 'previous_track' ],
          queue: [ 'next_track', 'last_track' ]
        }

        const givenAction = {
          type: 'NEXT',
          status: 'playing',
          track: 'next_track'
        }

        const actualState = playerStateReducer(givenState, givenAction)

        expect(actualState).toEqual({
          status: 'playing',
          active: 'next_track',
          history: [ 'current_track', 'previous_track' ],
          queue: [ 'last_track' ]
        })
      })

      it('should do nothing when there is no next track', () => {
        const givenState = {
          status: 'paused',
          active: 'current_track',
          history: [ 'previous_track' ],
          queue: null
        }

        const givenAction = {
          type: 'NEXT',
          status: 'playing',
          track: null
        }

        const actualState = playerStateReducer(givenState, givenAction)

        expect(actualState).toEqual({
          status: 'playing',
          active: 'current_track',
          history: [ 'previous_track' ],
          queue: []
        })
      })
    })

    describe('PREVIOUS action', () => {
      it('should go to the previous track when there is one', () => {
        const givenState = {
          status: 'paused',
          active: 'current_track',
          history: [ 'previous_track' ],
        }

        const givenAction = {
          type: 'PREVIOUS',
          status: 'playing'
        }

        const actualState = playerStateReducer(givenState, givenAction)

        expect(actualState).toEqual({
          status: 'playing',
          active: 'previous_track',
          history: [],
        })
      })

      it('should stay on current track when history is empty', () => {
        const givenState = {
          status: 'paused',
          active: 'current_track',
          history: null,
        }

        const givenAction = {
          type: 'PREVIOUS',
          status: 'playing'
        }

        const actualState = playerStateReducer(givenState, givenAction)

        expect(actualState).toEqual({
          status: 'playing',
          active: 'current_track',
          history: [],
        })
      })
    })

    it('should handle COMPLETED action', () => {
      const givenState = {
        status: 'init',
      }

      const givenAction = {
        type: 'COMPLETED',
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        status: 'paused'
      })
    })

    describe('SHUFFLE_PLAY action', () => {
      let shuffleStub

      beforeEach(() => {
        /*
         * shuffle stub will convert [ 'song_1', 'song_2', 'song_3', ] to [ 'song_2', 'song_1', 'song_3', ]
         */
        shuffleStub = jest.spyOn(lodash, 'shuffle').mockImplementation((songs) => {
          return [
            songs[1],
            songs[0],
            songs[2]
          ]
        })
      })

      afterEach(() => {
        shuffleStub.mockRestore()
      })

      it('should shuffle songs and go to next track', () => {
        const givenState = {
        }

        const givenAction = {
          type: 'SHUFFLE_PLAY',
          songs: [
            'song_1',
            'song_2',
            'song_3',
          ]
        }

        const actualState = playerStateReducer(givenState, givenAction)

        expect(actualState).toEqual({
          queue: [ 'song_2', 'song_1', 'song_3' ],
          active: 'song_2'
        })
      })
    })

    it('should handle ADD_TO_FAVORITE action', () => {
      const givenState = {
        favorite: [ { title: 'existing_song' } ]
      }

      const givenAction = {
        type: 'ADD_TO_FAVORITE',
        payload: {
          title: 'favourite_song'
        }
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        favorite: [ { title: 'existing_song' }, { title: 'favourite_song' } ],
        result: 'Added favourite_song to favorites'
      })
    })

    it('should handle REMOVE_FROM_FAVORITE action', () => {
      const givenState = {
        favorite: [ { id: 'song_id', title: 'existing_song' }, { id: 'other_song_id' } ]
      }

      const givenAction = {
        type: 'REMOVE_FROM_FAVORITE',
        payload: {
          id: 'song_id',
          title: 'existing_song'
        }
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        favorite: [ { id: 'other_song_id' } ],
        result: 'Removed existing_song from favorites'
      })
    })

    describe('ADD_QUEUE action', () => {
      describe('when state.active is empty', () => {
        it('should add a single song to a non-empty queue', () => {
          const givenState = {
            queue: [ 'existing_song' ]
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song'
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'existing_song', 'new_song' ],
            active: 'existing_song',
            result: 'Playing songs from the queue'
          })
        })

        it('should add a list of songs to a non-empty queue', () => {
          const givenState = {
            queue: [ 'existing_song' ]
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: ['new_song']
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'existing_song', 'new_song' ],
            active: 'existing_song',
            result: 'Playing songs from the queue'
          })
        })

        it('should add a single song to an empty queue', () => {
          const givenState = {
            queue: []
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song'
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'new_song' ],
            active: 'new_song',
            result: 'Playing songs from the queue'
          })
        })

        it('should add a list of songs to an empty queue', () => {
          const givenState = {
            queue: []
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: [ 'new_song' ]
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'new_song' ],
            active: 'new_song',
            result: 'Playing songs from the queue'
          })
        })
      })

      describe('when state.active is not empty', () => {
        it('should add a single song to a non-empty queue', () => {
          const givenState = {
            active: 'current_song',
            queue: [ 'existing_song' ]
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song'
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'existing_song', 'new_song' ],
            active: 'current_song',
            result: 'Added 1 songs to queue'
          })
        })

        it('should add a list of song to a non-empty queue', () => {
          const givenState = {
            active: 'current_song',
            queue: [ 'existing_song' ]
          }

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: [ 'new_song', 'new_song_2' ]
          }

          const actualState = playerStateReducer(givenState, givenAction)

          expect(actualState).toEqual({
            queue: [ 'existing_song', 'new_song', 'new_song_2' ],
            active: 'current_song',
            result: 'Added 2 songs to queue'
          })
        })
      })
    })

    it('should handle REMOVE_QUEUE action', () => {
      const givenState = {
        queue: [ { id: 'song_id' }, { id: 'other_song_id' } ]
      }

      const givenAction = {
        type: 'REMOVE_QUEUE',
        payload: {
          id: 'song_id',
        }
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        queue: [ { id: 'other_song_id' } ],
      })
    })

    it('should handle CLEAR_QUEUE action', () => {
      const givenState = {
        queue: [ { id: 'song_id' }, { id: 'other_song_id' } ]
      }

      const givenAction = {
        type: 'CLEAR_QUEUE',
        payload: []
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        queue: [],
        result: 'Queue cleared'
      })
    })

    it('should handle CLEAR_HISTORY action', () => {
      const givenState = {
        history: [ { id: 'song_id' }, { id: 'other_song_id' } ]
      }

      const givenAction = {
        type: 'CLEAR_HISTORY',
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        history: [],
        result: 'History cleared'
      })
    })

    it('should handle NOTIFY action', () => {
      const givenState = {
      }

      const givenAction = {
        type: 'NOTIFY',
        payload: 'notification'
      }

      const actualState = playerStateReducer(givenState, givenAction)

      expect(actualState).toEqual({
        result: 'notification'
      })
    })
  })
})
