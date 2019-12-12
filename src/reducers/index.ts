import { combineReducers } from 'redux';
import { concat, remove, union } from 'lodash';
import { TrackProps } from '../types';

const INITIAL_QUERY = {
  message: null,
  searchResult: false,
};

const INITIAL_CONFIG = {
  radio: false,
  repeat: 'repeat-all',
  setup: false,
  themeType: 'dark',
};

const INITIAL_STATE = {
  active: {},
  status: 'init',
};

const DASHBOARD_STATE = {
  charts: [],
  genres: [],
  hot100: [],
  newAlbums: [],
  topAlbums: [],
  topArtists: [],
  topKannada: [],
  topTracks: [],
};

const INITIAL_STORE = {
  albums: [],
  artists: [],
  songs: [],
};

// FIXME: Javascript implementation

export const mediaStoreReducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case 'DOWNLOAD':
      return {
        ...state,
        result: `${action.payload.title} downloaded successfully`,
        songs: concat(action.payload, state.songs),
      };

    case 'OFFLINE_SONGS':
      return {
        ...state,
        songs: action.payload,
      };

    case 'OFFLINE_ARTISTS':
      return {
        ...state,
        artists: action.payload,
      };

    case 'OFFLINE_ALBUMS':
      return {
        ...state,
        albums: action.payload,
      };
    default:
      return state;
  }
};

// TODO:
// Normalize queue

export const playerStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'LOAD':
      return {
        ...state,
        active: action.track,
      };

    case 'COMPLETED':
      return {
        ...state,
        status: 'paused',
      };

    case 'SHUFFLE_PLAY':
      // let queue = shuffle(action.songs);
      return {
        ...state,
        // queue: queue,
        // active: head(queue)
      };
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorite: union(state.favorite, [action.payload]),
        result: `Added ${action.payload.title} to favorites`,
      };
    case 'REMOVE_FROM_FAVORITE':
      return {
        ...state,
        favorite: remove(state.favorite, (n: TrackProps) => {
          return n.id !== action.payload.id;
        }),
        result: `Removed ${action.payload.title} from favorites`,
      };
    default:
      return state;
  }
};

export const queryReducer = (state = INITIAL_QUERY, action) => {
  switch (action.type) {
    case 'UPDATE_QUERY':
      return {
        ...state,
        searchResult: action.payload,
      };
    case 'NOTIFY':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const configReducer = (state = INITIAL_CONFIG, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return {
        ...state,
        themeType: action.payload,
      };
    case 'REPEAT':
      return {
        ...state,
        repeat: action.repeat,
      };
    case 'DEFAULT_SETUP':
      return {
        ...state,
        setup: action.payload,
      };
    case 'RADIO_MODE':
      return {
        ...state,
        radio: action.payload,
      };
    default:
      return state;
  }
};

export const RootReducer = combineReducers({
  config: configReducer,
  mediaStore: mediaStoreReducer,
  playerState: playerStateReducer,
  query: queryReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
