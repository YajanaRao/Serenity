export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

export const ADD_PLUGIN = 'ADD_SONG';
export const REMOVE_PLUGIN = 'REMOVE_SONG';

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export interface Song {
  id: any;
  title: string;
  artist: string;
  album: string;
}

export interface Plugin {
  id: any;
  name: string;
  loaded: boolean;
}
