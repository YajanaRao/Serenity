import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  ADD_SONG,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  Song,
  Plugin,
  ADD_PLUGIN,
} from './actionTypes';

export const addPlugin = (plugin: Plugin) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  plugin.loaded = false;
  dispatch({ type: ADD_PLUGIN, plugin });
};

export const addSong = (song: Song) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: ADD_SONG, song });
};

// export cons

export const toggleTodo = (index: number) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: TOGGLE_TODO, index });
};
export const setVisibilityFilter = (filter: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({ type: SET_VISIBILITY_FILTER, filter });
};
