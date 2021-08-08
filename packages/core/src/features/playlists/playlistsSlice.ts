import { createSlice, nanoid } from '@reduxjs/toolkit';
import { SongProps } from 'features/player/types';
import { RootState } from 'store';

type PlaylistProps = { id: string; name: string, owner: string, date: string, liked: boolean, songs: SongProps[] }

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: [] as PlaylistProps[],
  reducers: {
    addPlaylist: {
      reducer(state, action) {
        const { id, name } = action.payload;
        state.push({
          id,
          name,
          liked: false,
          owner: 'You',
          date: new Date().toUTCString(),
          songs: [],
        });
      },
      prepare(name: string) {
        return { payload: { name, id: nanoid() } };
      },
    },
    deletePlaylist(state, action) {
      state.filter(playlist => playlist.id !== action.payload)
    },
    renamePlaylist(state, action) {
      const { playlistId, name } = action.payload;
      const playlist = state.find(playlist => playlist.id === playlistId);
      if (playlist) {
        playlist.name = name;
      }
    },
    addSongToPlaylist: {
      reducer(state, action) {
        const { playlistId, songId } = action.payload;
        const playlist = state.find(playlist => playlist.id === playlistId);
        if (playlist) {
          const songs = [...playlist.songs, songId];
          playlist.songs = songs.filter(function (item, pos) {
            return songs.indexOf(item) == pos;
          });
        }
      },
      prepare(playlistId: string, songId: string) {
        return { payload: { playlistId, songId } };
      },
    },
    togglePlaylistLike(state, action) {
      const playlist = state.find(playlist => playlist.id === action.payload);
      if (playlist) {
        playlist.liked = !playlist.liked;
      }
    },
  },
});

export const selectPlaylists = (state: RootState) => state.playlists;

// get all playlist ids
export const selectPlaylistIds = (state: RootState) => {
  return selectPlaylists(state).map((playlist: PlaylistProps) => playlist.id);
};

// get playlist from id
export const selectPlaylistById = (state: RootState, playlistId: string) => {
  return selectPlaylists(state).find((playlist: PlaylistProps) => playlist.id === playlistId)
}

export const selectPlaylistSongsById = (state: RootState, playlistId: string) => {
  const playlist = selectPlaylistById(state, playlistId);
  return playlist.songs.map((song: SongProps) => song.id);
};

export const { addPlaylist, deletePlaylist, renamePlaylist, addSongToPlaylist, toggleLike } =
  playlistsSlice.actions;

export default playlistsSlice.reducer;
