import { createSlice, createAsyncThunk, createEntityAdapter, createSelector, EntityId } from "@reduxjs/toolkit";
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

export const selectLikedSongIds = (state: RootState) => songsSelectors.selectIds(state).filter(id => songsSelectors.selectById(state, id)?.liked);


export const selectSongLikeById = (state: RootState, songId: EntityId) => {
    return songsSelectors.selectById(state, songId)?.liked;
}

export const selectFilteredSongs = (state: RootState, query: string) => songsSelectors.selectIds(state).filter(id => songsSelectors.selectById(state, id)?.title.toLowerCase().includes(query.toLowerCase()))

export const selectLikedSongs = (state: RootState) => selectLikedSongIds(state).map(id => {
    const song = songsSelectors.selectById(state, id);
    // return {
    //     id: song
    // }
    return song;
});

export const { toggleSongLike, songAdded, songsAdded } = songsSlice.actions;

export default songsSlice.reducer;