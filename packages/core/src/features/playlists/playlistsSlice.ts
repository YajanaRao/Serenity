import { createSlice } from '@reduxjs/toolkit';

export const userPlaylistIdPrefix = 'user-playlist--';

const generateId = () => {
  const r = Math.random()
    .toString(36)
    .substring(7);
  return `${userPlaylistIdPrefix}${r}`;
};



const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: [],
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
        return { payload: { name, id: generateId() } };
      },
    },
    deletePlaylist(state, action) {
      state.filter(playlist => playlist.id !== action.payload)
    },
    renamePlaylist: {
      reducer(state, action) {
        const { playlistId, name } = action.payload;
        const playlist = state.find(playlist => playlist.id === playlistId);
        if (playlist) {
          playlist.name = name;
        }
      },
      prepare(playlistId: string, name: string) {
        return { payload: { playlistId, name } };
      },
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

export const selectPlaylists = (state) => state.playlists;

// get all playlist ids
export const selectPlaylistIds = (state) => {
  return selectPlaylists(state).map((playlist) => playlist.id);
};

// get playlist from id
export const selectPlaylistById = (state, playlistId: string) => {
  return selectPlaylists(state).find((playlist) => playlist.id === playlistId)
}

export const selectPlaylistSongsById = (state, playlistId: string) => {
  const playlist = selectPlaylistById(state, playlistId);
  return playlist.songs.map((song) => song.id);
};

export const { addPlaylist, deletePlaylist, renamePlaylist, addSongToPlaylist, toggleLike } =
  playlistsSlice.actions;

export default playlistsSlice.reducer;
