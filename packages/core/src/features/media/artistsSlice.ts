import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
// import { normalizeAlbums, normalizeArtists, normalizeSongs } from "../../schema";


export const fetchOfflineArtists = createAsyncThunk(
    'artists/offline',
    async (_, { }) => {
        const media = await RNAndroidAudioStore.getArtists({});
        if (!media) {
            return []
        }
        return media;
    }
)


type Artist = { id: string; title: string, album: string, artist: string }

const artistsAdapter = createEntityAdapter<Artist>({
    // Assume IDs are stored in a field other than `book.id`
    // selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),
})


const artistsSlice = createSlice({
    name: "artists",
    initialState: artistsAdapter.getInitialState({
        loading: false,
        error: null
    }),
    reducers: {

        artistAdded: artistsAdapter.addOne,
        // artist
        toggleArtistLike(state, action) {
            const artist = state.artists.entities.find((artist) => artist.id === action.payload);
            if (artist) {
                artist.liked = !artist.liked;
            }
        },
    },
    extraReducers: {

        // handling artists
        [fetchOfflineArtists.pending]: (state, action) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        [fetchOfflineArtists.fulfilled]: (state, action) => {
            if (state.loading) {
                state.loading = false;
                if (action.payload && action.payload.length) {
                    artistsAdapter.setAll(state, action.payload)
                    //   const normalized = normalizeSongs(action.payload)
                    //   const entities = normalized.entities.songs;
                    //   state.songs.entities = entities;
                    //   state.songs.allIds = Object.keys(entities);
                }
            }
        },
        [fetchOfflineArtists.rejected]: (state, action) => {
            if (state.loading) {
                state.loading = false;
                state.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const artistsSelectors = artistsAdapter.getSelectors(
    (state) => state.artists
)
export default artistsSlice.reducer;