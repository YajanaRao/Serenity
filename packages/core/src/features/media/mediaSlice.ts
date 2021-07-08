import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import { normalizeAlbums, normalizeArtists } from "../../schema";

export const fetchOfflineArtists = createAsyncThunk(
  'media/artists',
  async (_, { }) => {
    const media = await RNAndroidAudioStore.getArtists({});
    if (!media) {
      return []
    }
    return media;
  }
)

export const fetchOfflineAlbums = createAsyncThunk(
  'media/albums',
  async (_, { }) => {
    const media = await RNAndroidAudioStore.getAlbums({});
    if (!media) {
      return []
    }
    return media;
  }
)

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    artists: {
      allIds: [],
      entities: [],
      loading: false,
      error: null,
    },
    albums: {
      allIds: [],
      entities: [],
      loading: false,
      error: null,
    },

  },
  reducers: {
    // artist
    toggleArtistLike(state, action) {
      const artist = state.artists.entities.find((artist) => artist.id === action.payload);
      if (artist) {
        artist.liked = !artist.liked;
      }
    },

    // album 
    toggleAlbumLike(state, action) {
      const album = state.albums.entities.find((album) => album.id === action.payload);
      if (album) {
        album.liked = !album.liked;
      }
    },
  },
  extraReducers: {



    // handling artists
    [fetchOfflineArtists.pending]: (state, action) => {
      if (!state.artists.loading) {
        state.artists.loading = true
      }
    },
    [fetchOfflineArtists.fulfilled]: (state, action) => {
      if (state.artists.loading) {
        state.artists.loading = false;
        if (action.payload && action.payload.length) {
          const normalized = normalizeArtists(action.payload);
          const entities = normalized.entities.artists;
          state.artists.entities = entities;
          state.artists.allIds = Object.keys(entities);
        }
      }
    },
    [fetchOfflineArtists.rejected]: (state, action) => {
      if (state.artists.loading) {
        console.log("pending", state);
        state.artists.loading = false;
        state.artists.error = action.error
      }
    },

    // handling albums
    [fetchOfflineAlbums.pending]: (state, action) => {
      if (!state.albums.loading) {
        state.albums.loading = true
      }
    },
    [fetchOfflineAlbums.fulfilled]: (state, action) => {
      if (state.albums.loading) {
        state.albums.loading = false;
        if (action.payload && action.payload.length) {
          const normalized = normalizeAlbums(action.payload);
          const entities = normalized.entities.albums;
          state.albums.entities = entities;
          state.albums.allIds = Object.keys(entities);
        }
      }
    },
    [fetchOfflineAlbums.rejected]: (state, action) => {
      if (state.albums.loading) {
        console.log("pending", state);
        state.albums.loading = false;
        state.albums.error = action.error
      }
    },
  },
});

// get only entries
export const selectSong = (state) => state.media.songs.entities;
export const selectArtists = (state) => state.media.artists.entities;
export const selectAlbums = (state) => state.media.albums.entities;

// get list of ids
// export const selectSongIds = (state) => state.media.songs.allIds;
export const selectArtistIds = (state) => state.media.artists.allIds;
export const selectAlbumIds = (state) => state.media.albums.allIds;

// favorite media
export const selectLikedAlbums = (state) => selectAlbums(state).filter(album => album.liked === true)

export const selectLikedArtists = (state) => selectArtists(state).filter(artist => artist.liked === true)

// favorite media ids
export const selectLikedAlbumIds = (state) => selectLikedAlbums(state).map((album) => album.id)

export const selectLikedArtistIds = (state) => selectLikedArtists(state).map((artist) => artist.id)

// check an artist liked status
export const selectLikedAlbumById = (state, artistId: string) => selectLikedAlbumIds(state).find((id) => id === artistId)

export const selectLikedArtistById = (state, artistId: string) => selectLikedArtists(state).find((id) => id === artistId)

export const selectArtistById = (state, artistId: string) => state.media.artists.entities[artistId];
export const selectAlbumById = (state, albumId: string) => state.media.albums.entities[albumId];


export const { toggleArtistLike, toggleAlbumLike } = mediaSlice.actions;

export default mediaSlice.reducer;
