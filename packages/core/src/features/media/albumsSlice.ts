import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getAlbums } from "./deviceMedia";



type Album = { id: string; author: string, album: string, cover: string, numberOfSongs: string, numberOfAlbums: string, liked: boolean }

export const fetchAlbums = createAsyncThunk<[Album]>('albums/fetch', async () => {
    // @ts-ignore
    const media = await getAlbums();
    if (!media) {
        return []
    }
    return media;
})



const albumsAdapter = createEntityAdapter<Album>({
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
        // @ts-ignore
        [fetchAlbums.pending]: (state) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        // @ts-ignore
        [fetchAlbums.fulfilled]: (state, action) => {
            if (state.loading) {
                if (action.payload && action.payload.length) {
                    albumsAdapter.setAll(state, action.payload)
                }
                state.loading = false;
            }
        },
        // @ts-ignore
        [fetchAlbums.rejected]: (state, action) => {
            if (state.loading) {
                state.loading = false;
                state.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const albumsSelectors = albumsAdapter.getSelectors<RootState>(
    (state) => state.albums
)

export const selectAlbumLikeById = (state: RootState, albumId: number) => {
    const album = albumsSelectors.selectById(state, albumId);
    return album?.liked;
}

export const selectLikedAlbums = (state: RootState) => albumsSelectors.selectIds(state).filter(id => albumsSelectors.selectById(state, id)?.liked)

export const { albumUpdated } = albumsSlice.actions;

export default albumsSlice.reducer;