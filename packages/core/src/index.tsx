import playlistsSlice from './features/playlists/playlistsSlice';
import albumsSlice from './features/media/albumsSlice';
import uiSlice from './features/ui/uiSlice';
import songsSlice from './features/media/songsSlice';
import artistsSlice from './features/media/artistsSlice';
import store from './store'
import { useAppSelector, useAppDispatch } from './hooks';

export * from './features/playlists/playlistsSlice';
export * from './features/media/albumsSlice';
export * from './features/player/playerSlice';
export * from './features/ui/uiSlice';
export * from './features/media/songsSlice';
export * from './features/player/queueSlice';
export * from './features/media/artistsSlice';
export * from './features/player/historySlice';
export * from './features/player';
export * as Player from './features/player';
export * as UI from './features/ui';

export {
    playlistsSlice,
    albumsSlice,
    uiSlice,
    songsSlice,
    artistsSlice,
    store,
    useAppSelector,
    useAppDispatch
}

export type EntityId = number | string

export * from './features/player/types';