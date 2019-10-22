import expect from 'expect';
import { playerStateReducer } from '../../src/reducers';

jest.unmock('lodash');
const lodash = require.requireActual('lodash');

describe('reducers/index.js', () => {
  describe('playerStateReducer', () => {
    it('should handle DOWNLOAD action', () => {
      const givenState = {
        status: 'init',
      };

      const givenAction = {
        type: 'STATUS',
        status: 'new_status',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        status: 'new_status',
      });
    });

    it('should handle LOAD action', () => {
      const givenState = {
        status: 'paused',
        active: 'track_1',
      };

      const givenAction = {
        type: 'LOAD',
        status: 'playing',
        track: 'track_2',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        status: 'playing',
        active: 'track_2',
      });
    });

    it('should handle COMPLETED action', () => {
      const givenState = {
        status: 'init',
      };

      const givenAction = {
        type: 'COMPLETED',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        status: 'paused',
      });
    });

    describe('SHUFFLE_PLAY action', () => {
      let shuffleStub;

      beforeEach(() => {
        /*
         * shuffle stub will convert [ 'song_1', 'song_2', 'song_3', ] to [ 'song_2', 'song_1', 'song_3', ]
         */
        shuffleStub = jest
          .spyOn(lodash, 'shuffle')
          .mockImplementation(songs => {
            return [songs[1], songs[0], songs[2]];
          });
      });

      afterEach(() => {
        shuffleStub.mockRestore();
      });
    });

    it('should handle ADD_TO_FAVORITE action', () => {
      const givenState = {
        favorite: [{ title: 'existing_song' }],
      };

      const givenAction = {
        type: 'ADD_TO_FAVORITE',
        payload: {
          title: 'favourite_song',
        },
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        favorite: [{ title: 'existing_song' }, { title: 'favourite_song' }],
        result: 'Added favourite_song to favorites',
      });
    });

    it('should handle REMOVE_FROM_FAVORITE action', () => {
      const givenState = {
        favorite: [
          { id: 'song_id', title: 'existing_song' },
          { id: 'other_song_id' },
        ],
      };

      const givenAction = {
        type: 'REMOVE_FROM_FAVORITE',
        payload: {
          id: 'song_id',
          title: 'existing_song',
        },
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        favorite: [{ id: 'other_song_id' }],
        result: 'Removed existing_song from favorites',
      });
    });

    describe('ADD_QUEUE action', () => {
      describe('when state.active is empty', () => {
        it('should add a single song to a non-empty queue', () => {
          const givenState = {
            queue: ['existing_song'],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song',
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: ['existing_song'],
          });
        });

        it('should add a list of songs to a non-empty queue', () => {
          const givenState = {
            queue: ['existing_song'],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: ['new_song'],
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: ['existing_song'],
          });
        });

        it('should add a single song to an empty queue', () => {
          const givenState = {
            queue: [],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song',
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: [],
          });
        });

        it('should add a list of songs to an empty queue', () => {
          const givenState = {
            queue: [],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: ['new_song'],
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: [],
          });
        });
      });

      describe('when state.active is not empty', () => {
        it('should add a single song to a non-empty queue', () => {
          const givenState = {
            active: 'current_song',
            queue: ['existing_song'],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: 'new_song',
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: ['existing_song'],
            active: 'current_song',
          });
        });

        it('should add a list of song to a non-empty queue', () => {
          const givenState = {
            active: 'current_song',
            queue: ['existing_song'],
          };

          const givenAction = {
            type: 'ADD_QUEUE',
            payload: ['new_song', 'new_song_2'],
          };

          const actualState = playerStateReducer(givenState, givenAction);

          expect(actualState).toEqual({
            queue: ['existing_song'],
            active: 'current_song',
          });
        });
      });
    });

    it('should handle REMOVE_QUEUE action', () => {
      const givenState = {
        queue: [{ id: 'song_id' }, { id: 'other_song_id' }],
      };

      const givenAction = {
        type: 'REMOVE_QUEUE',
        payload: {
          id: 'song_id',
        },
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        queue: [{ id: 'song_id' }, { id: 'other_song_id' }],
      });
    });

    it('should handle CLEAR_QUEUE action', () => {
      const givenState = {
        queue: [{ id: 'song_id' }, { id: 'other_song_id' }],
      };

      const givenAction = {
        type: 'CLEAR_QUEUE',
        payload: [],
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        queue: [
          {
            id: 'song_id',
          },
          {
            id: 'other_song_id',
          },
        ],
      });
    });

    it('should handle CLEAR_HISTORY action', () => {
      const givenState = {
        history: [{ id: 'song_id' }, { id: 'other_song_id' }],
      };

      const givenAction = {
        type: 'CLEAR_HISTORY',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({
        history: [
          {
            id: 'song_id',
          },
          {
            id: 'other_song_id',
          },
        ],
      });
    });

    it('should handle NOTIFY action', () => {
      const givenState = {};

      const givenAction = {
        type: 'NOTIFY',
        payload: 'notification',
      };

      const actualState = playerStateReducer(givenState, givenAction);

      expect(actualState).toEqual({});
    });
  });
});
