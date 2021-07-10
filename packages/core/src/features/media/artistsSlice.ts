import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import { RootState } from "store";


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


type Artist = { id: string; artist: string, numberOfSongs: string, numberOfAlbums: string, liked: boolean }

const artistsAdapter = createEntityAdapter<Artist>({
    // Assume IDs are stored in a field other than `book.id`
    // selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.artist.localeCompare(b.artist),
})


const artistsSlice = createSlice({
    name: "artists",
    initialState: artistsAdapter.getInitialState({
        loading: false,
        error: null
    }),
    reducers: {

        artistAdded: artistsAdapter.addOne,
        artistUpdated: artistsAdapter.updateOne
    },
    extraReducers: {

        // handling artists
        [fetchOfflineArtists.pending]: (state) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        [fetchOfflineArtists.fulfilled]: (state, action) => {
            console.log(action.payload);
            if (state.loading) {
                if (action.payload && action.payload.length) {
                    artistsAdapter.setAll(state, action.payload)
                }
                state.loading = false;
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
    (state: RootState) => state.artists
)

export const selectArtistLikeById = (state, albumId: number) => {
    const album = artistsSelectors.selectById(state, albumId);
    return album?.liked;
}

export const selectLikedArtists = (state) => artistsSelectors.selectIds(state).filter(id => artistsSelectors.selectById(state, id)?.liked)
export const selectFilteredArtists = (state, query: string) => artistsSelectors.selectIds(state).filter(id => artistsSelectors.selectById(state, id)?.artist.startsWith(query))

export const { artistUpdated } = artistsSlice.actions;

export default artistsSlice.reducer;