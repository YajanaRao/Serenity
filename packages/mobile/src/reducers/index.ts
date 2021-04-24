import { combineReducers } from 'redux';
import { Appearance } from 'react-native';
import { ArtistProps, TrackProps, AlbumProps } from '../utils/types';

interface MediaActions {
  payload: TrackProps[] | ArtistProps[] | AlbumProps[];
  type: string;
}

interface PlayerActions {
  status?: string;
  track?: TrackProps;
  type: string;
}

interface ConfigActions {
  payload?: boolean | string;
  repeat?: string;
  type: string;
}

interface QueryActions {
  payload: boolean | string;
  type: string;
}
const INITIAL_QUERY = {
  message: '',
  searchResult: false,
};

export const INITIAL_CONFIG = {
  radio: false,
  repeat: 'repeat-all',
  setup: false,
  themeType: Appearance.getColorScheme(),
};

const INITIAL_STATE = {
  active: {},
  status: 'init',
};

const INITIAL_USER = {
  user: {},
  googleAccessGiven: false,
  offlineReadAccessGiven: false,
  offlineWriteAccessGiven: false,
  introSlidesShown: false,
};

const INITIAL_STORE = {
  albums: [],
  artists: [],
  songs: [],
};

// FIXME: Javascript implementation

export const mediaStoreReducer = (
  state = INITIAL_STORE,
  action: MediaActions,
) => {
  switch (action.type) {
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

export const playerStateReducer = (
  state = INITIAL_STATE,
  action: PlayerActions,
) => {
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
    default:
      return state;
  }
};

export const queryReducer = (state = INITIAL_QUERY, action: QueryActions) => {
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

export const userReducer = (state = INITIAL_USER, action: QueryActions) => {
  switch (action.type) {
    case 'APP_INTRO':
      return {
        ...state,
        introSlidesShown: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        googleAccessGiven: true,
      };
    case 'SET_GOOGLE_ACCESS':
      return {
        ...state,
        googleAccessGiven: action.payload,
      };
    case 'SET_OFFLINE_READ_ACCESS':
      return {
        ...state,
        offlineReadAccessGiven: action.payload,
      };
    case 'SET_OFFLINE_WRITE_ACCESS':
      return {
        ...state,
        offlineWriteAccessGiven: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: {},
        googleAccessGiven: false,
      };
    default:
      return state;
  }
};

export const configReducer = (
  state = INITIAL_CONFIG,
  action: ConfigActions,
) => {
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

export const RootReducer = combineReducers<any>({
  config: configReducer,
  mediaStore: mediaStoreReducer,
  playerState: playerStateReducer,
  query: queryReducer,
  user: userReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
