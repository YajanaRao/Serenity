import playlistsSlice from './features/playlists/playlistsSlice';
import mediaSlice from './features/media/mediaSlice';
import playerSlice from './features/player/playerSlice';
import uiSlice from './features/ui/uiSlice';
import songsSlice from './features/media/songsSlice';
import store from './store'

export * as Playlist from './features/playlists/playlistsSlice';
export * from './features/playlists/playlistsSlice';
export * from './features/media/mediaSlice';
export * as Media from './features/media/mediaSlice';
export * from './features/player/playerSlice';
export * as Player from './features/player/playerSlice';
export * from './features/ui/uiSlice';
export * as UI from './features/ui/uiSlice';
export * from './features/media/songsSlice';
export * from './actions/player';
export * from './hooks/use-redux-state';

export {
    playlistsSlice,
    mediaSlice,
    playerSlice,
    uiSlice,
    songsSlice,
    store
}