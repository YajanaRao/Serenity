import { combineReducers } from 'redux';
import { configReducer } from './configReducer';
import playlistsSlice from '../features/playlists/playlistsSlice';
import mediaSlice from '../features/media/mediaSlice';
import playerSlice from '../features/player/playerSlice';
import uiSlice from '../features/ui/uiSlice';
import songsSlice from '../features/media/songsSlice';

interface QueryActions {
  payload: boolean | string;
  type: string;
}
const INITIAL_QUERY = {
  message: '',
  searchResult: false,
};

const INITIAL_USER = {
  user: {},
  googleAccessGiven: false,
  offlineReadAccessGiven: false,
  offlineWriteAccessGiven: false,
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


export const RootReducer = combineReducers<any>({
  player: playerSlice,
  playlists: playlistsSlice,
  media: mediaSlice,
  songs: songsSlice,
  ui: uiSlice,
  config: configReducer,
  query: queryReducer,
  user: userReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
