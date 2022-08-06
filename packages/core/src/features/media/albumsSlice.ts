import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../store";


type Album = { id: string; author: string, album: string, cover: string, numberOfSongs: string, numberOfAlbums: string, liked: boolean }


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

        albumAdded: albumsAdapter.addMany,
        albumUpdated: albumsAdapter.updateOne
    }
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

export const { albumUpdated, albumAdded } = albumsSlice.actions;

export default albumsSlice.reducer;