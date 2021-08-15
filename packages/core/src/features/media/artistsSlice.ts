// @ts-nocheck
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "store";
// import { getArtists } from "./deviceMedia";


// export const fetchOfflineArtists = createAsyncThunk(
//     'artists/offline',
//     async (_, { }) => {
//         const media = await getArtists()
//         if (!media) {
//             return []
//         }
//         return media;
//     }
// )


type Artist = { id: string; artist: string, numberOfSongs: string, numberOfAlbums: string, liked: boolean }

const artistsAdapter = createEntityAdapter<Artist>({
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
        artistsAdded: artistsAdapter.addMany,
        artistUpdated: artistsAdapter.updateOne
    }
});


// Can create a set of memoized selectors based on the location of this entity state
export const artistsSelectors = artistsAdapter.getSelectors<RootState>(
    // @ts-ignore
    (state) => state.artists
)

// @ts-ignore
export const selectArtistLikeById = (state, albumId: number) => {
    const album = artistsSelectors.selectById(state, albumId);
    return album?.liked;
}

// @ts-ignore
export const selectLikedArtists = (state) => artistsSelectors.selectIds(state).filter(id => artistsSelectors.selectById(state, id)?.liked)

// @ts-ignore
export const selectFilteredArtists = (state, query: string) => artistsSelectors.selectIds(state).filter(id => artistsSelectors.selectById(state, id)?.artist.startsWith(query))

export const { artistUpdated, artistAdded, artistsAdded } = artistsSlice.actions;

export default artistsSlice.reducer;