import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import { RootState } from "store";


export const fetchOfflineAlbums = createAsyncThunk(
    'albums/offline',
    async (_, { }) => {
        const media = await RNAndroidAudioStore.getAlbums({});
        if (!media) {
            return []
        }
        return media;
    }
)


type Album = { id: string; author: string, album: string, cover: string, numberOfSongs: string, numberOfAlbums: string, liked: boolean }

const albumsAdapter = createEntityAdapter<Album>({
    // Assume IDs are stored in a field other than `book.id`
    // selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.album.localeCompare(b.album),
})


const albumsSlice = createSlice({
    name: "albums",
    initialState: albumsAdapter.getInitialState({
        loading: false,
        error: null
    }),
    reducers: {

        albumAdded: albumsAdapter.addOne,
        albumUpdated: albumsAdapter.updateOne
    },
    extraReducers: {

        // handling artists
        [fetchOfflineAlbums.pending]: (state) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        [fetchOfflineAlbums.fulfilled]: (state, action) => {
            if (state.loading) {
                if (action.payload && action.payload.length) {
                    albumsAdapter.setAll(state, action.payload)
                }
                state.loading = false;
            }
        },
        [fetchOfflineAlbums.rejected]: (state, action) => {
            if (state.loading) {
                state.loading = false;
                state.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const albumsSelectors = albumsAdapter.getSelectors(
    (state: RootState) => state.albums
)

export const selectAlbumLikeById = (state, albumId: number) => {
    const album = albumsSelectors.selectById(state, albumId);
    return album?.liked;
}

export const selectLikedAlbums = (state) => albumsSelectors.selectIds(state).filter(id => albumsSelectors.selectById(state, id)?.liked)

export const { albumUpdated } = albumsSlice.actions;

export default albumsSlice.reducer;