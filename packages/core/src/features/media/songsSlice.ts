import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
// import { normalizeAlbums, normalizeArtists, normalizeSongs } from "../../schema";

const nextSongId = 0;

export const fetchOfflineSongs = createAsyncThunk(
    'songs/offline',
    async (_, { }) => {
        const media = await RNAndroidAudioStore.getAll({});
        if (!media) {
            return []
        }
        return media;
    }
)


type Song = { id: string; title: string, album: string, artist: string, path: string }

const songsAdapter = createEntityAdapter<Song>({
    // Assume IDs are stored in a field other than `book.id`
    // selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),
})


const songsSlice = createSlice({
    name: "songs",
    initialState: songsAdapter.getInitialState({
        loading: false,
        error: null
    }),
    reducers: {

        songAdded: songsAdapter.addOne,
        // song
        toggleSongLike(state, action) {
            const song = state.songs.entities.find((song) => song.id === action.payload);
            if (song) {
                song.liked = !song.liked;
            }
        },
    },
    extraReducers: {

        // handling songs
        [fetchOfflineSongs.pending]: (state, action) => {
            if (!state.songs.loading) {
                state.songs.loading = true
                state.songs.error = null;
            }
        },
        [fetchOfflineSongs.fulfilled]: (state, action) => {
            if (state.songs.loading) {
                state.songs.loading = false;
                if (action.payload && action.payload.length) {
                    songsAdapter.setAll(state, action.payload)
                    //   const normalized = normalizeSongs(action.payload)
                    //   const entities = normalized.entities.songs;
                    //   state.songs.entities = entities;
                    //   state.songs.allIds = Object.keys(entities);
                }
            }
        },
        [fetchOfflineSongs.rejected]: (state, action) => {
            if (state.songs.loading) {
                console.log("pending", state);
                state.songs.loading = false;
                state.songs.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const songsSelectors = songsAdapter.getSelectors(
    (state) => state.songs
)
export default songsSlice.reducer;