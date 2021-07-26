// @ts-nocheck
import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
import { getSongs } from "./deviceMedia";


export const fetchOfflineSongs = createAsyncThunk(
    'songs/offline',
    async () => {
        const media = await getSongs();
        if (!media) {
            return []
        }
        return media;
    }
)


type Song = { id: string; title: string, album: string, artist: string, path: string, liked: boolean, cover: string }

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
        songsAdded: songsAdapter.addMany,
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
        // @ts-ignore
        [fetchOfflineSongs.pending]: (state) => {
            if (!state.loading) {
                state.loading = true
                state.error = null;
            }
        },
        // @ts-ignore
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
        // @ts-ignore
        [fetchOfflineSongs.rejected]: (state, action) => {
            if (state.loading) {
                state.loading = false;
                state.error = action.error
            }
        },
    },
});


// Can create a set of memoized selectors based on the location of this entity state
export const songsSelectors = songsAdapter.getSelectors<RootState>(
    (state) => state.songs
)

export const selectLikedSongs = createSelector([state => songsSelectors.selectAll(state)], songs => songs.filter(song => song.liked));

export const selectSongLikeById = (state, songId: number) => {
    const song = songsSelectors.selectById(state, songId);
    return song?.liked;
}

export const selectFilteredSongs = (state, query: string) => songsSelectors.selectIds(state).filter(id => songsSelectors.selectById(state, id)?.title.toLowerCase().includes(query.toLowerCase()))

// @ts-ignore
export const selectLikedSongIds = createSelector([selectLikedSongs], likedSongs => likedSongs.map(item => item.id))

export const { toggleSongLike, songAdded, songsAdded } = songsSlice.actions;

export default songsSlice.reducer;