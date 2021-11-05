import { createSlice, nanoid } from "@reduxjs/toolkit";
import { SongProps } from "../player/types";
import { RootState } from "../../store";

type PlaylistProps = {
  id: string;
  name: string;
  owner: string;
  date: string;
  liked: boolean;
  songs: SongProps[];
};

const initialState: PlaylistProps[] = []
// {
//   id: nanoid(),
//   name: "Chants",
//   liked: false,
//   owner: "Serenity",
//   date: new Date().toUTCString(),
//   songs: [
//     {
//       id: nanoid(),
//       title: "Nirvana Shatakam",
//       artist: "Sounds of Isha",
//       path: "http://docs.google.com/uc?export=open&id=14bZMducT2AppBJlpou-uq_uY8LqnQ07H"
//     },
//     {
//       id: nanoid(),
//       title: "Ganapathi Upanishath",
//       path: "http://docs.google.com/uc?export=open&id=191L0KaL2KCMcETUb5M_w-ZgeT9WZKrQz"
//     }
//   ]
// }

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addPlaylist(state, action) {
      const name = action.payload;
      const id = nanoid();
      state.push({
        id,
        name,
        liked: false,
        owner: "You",
        date: new Date().toUTCString(),
        songs: [],
      });
    },
    deletePlaylist(state, action) {
      state.filter((playlist) => playlist.id !== action.payload);
    },
    renamePlaylist(state, action) {
      const { playlistId, name } = action.payload;
      const playlist = state.find((playlist) => playlist.id === playlistId);
      if (playlist) {
        playlist.name = name;
      }
    },
    addSongToPlaylist(state, action) {
      const { playlistId, songId } = action.payload;
      const playlist = state.find((playlist) => playlist.id === playlistId);
      if (playlist) {
        const songs = [...playlist.songs, songId];
        playlist.songs = songs.filter(function (item, pos) {
          return songs.indexOf(item) == pos;
        });
      }
    },
    togglePlaylistLike(state, action) {
      const playlist = state.find((playlist) => playlist.id === action.payload);
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
  return selectPlaylists(state).find(
    (playlist: PlaylistProps) => playlist.id === playlistId
  );
};

export const selectPlaylistSongsById = (
  state: RootState,
  playlistId: string
) => {
  const playlist = selectPlaylistById(state, playlistId);
  return playlist.songs.map((song: SongProps) => song.id);
};

export const {
  addPlaylist,
  deletePlaylist,
  renamePlaylist,
  addSongToPlaylist,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
