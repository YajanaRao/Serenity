import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
// import { normalizeAlbums, normalizeArtists, normalizeSongs } from "../../schema";


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


type Song = { id: string; title: string, album: string, artist: string, path: string, liked: boolean }

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
            const song = state.entities[action.payload];
            if (song) {
                song.liked = !song.liked;
            }
        },
    },
    extraReducers: {

        // handling songs
        [fetchOfflineSongs.pending]: (state, action) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        [fetchOfflineSongs.fulfilled]: (state, action) => {
            if (state.loading) {
                state.loading = false;
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
            if (state.loading) {
                console.log("pending", state);
                state.loading = false;
                state.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const songsSelectors = songsAdapter.getSelectors(
    (state) => state.songs
)

export const selectSongLikeById = (state, songId: number) => {
    const song = songsSelectors.selectById(state, songId);
    return song?.liked;
}

export const { toggleSongLike } = songsSlice.actions;

export default songsSlice.reducer;