import playlistsSlice from './features/playlists/playlistsSlice';
import albumsSlice from './features/media/albumsSlice';
import playerSlice from './features/player/playerSlice';
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
export * from './features/media/artistsSlice';
export * from './actions/player';

export {
    playlistsSlice,
    albumsSlice,
    playerSlice,
    uiSlice,
    songsSlice,
    artistsSlice,
    store,
    useAppSelector,
    useAppDispatch
}