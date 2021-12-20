import { combineReducers } from 'redux';
import historySlice from '../features/player/historySlice';
import artistsSlice from '../features/media/artistsSlice';
import playlistsSlice from '../features/playlists/playlistsSlice';
import albumsSlice from '../features/media/albumsSlice';
import playerSlice from '../features/player/playerSlice';
import uiSlice from '../features/ui/uiSlice';
import songsSlice from '../features/media/songsSlice';
import queueSlice from '../features/player/queueSlice';

interface QueryActions {
  payload: boolean | string;
  type: string;
}
const INITIAL_QUERY = {
  message: '',
  searchResult: false,
};



export const queryReducer = (state = INITIAL_QUERY, action: QueryActions) => {
  switch (action.type) {
    case 'UPDATE_QUERY':
      return {
        ...state,
        searchResult: action.payload,
      };
    default:
      return state;
  }
};




export const RootReducer = combineReducers<any>({
  player: playerSlice,
  history: historySlice,
  queue: queueSlice,
  playlists: playlistsSlice,
  albums: albumsSlice,
  songs: songsSlice,
  artists: artistsSlice,
  ui: uiSlice,
  query: queryReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
