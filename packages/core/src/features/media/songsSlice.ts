import { createSlice, createEntityAdapter, EntityId } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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
});


// Can create a set of memoized selectors based on the location of this entity state
export const songsSelectors = songsAdapter.getSelectors<RootState>(
    (state) => state.songs
)

export const selectLikedSongIds = (state: RootState) => songsSelectors.selectIds(state).filter(id => songsSelectors.selectById(state, id)?.liked);


export const selectSongLikeById = (state: RootState, songId: EntityId) => {
    return songsSelectors.selectById(state, songId)?.liked;
}

export const selectFilteredSongs = (state: RootState, query: string) => songsSelectors.selectIds(state).filter(id => {
    if (songsSelectors.selectById(state, id)?.title && query) {
        return songsSelectors.selectById(state, id)?.title.toLowerCase().includes(query.toLowerCase())
    }
})

export const selectLikedSongs = (state: RootState) => selectLikedSongIds(state).map(id => {
    const song = songsSelectors.selectById(state, id);
    return song;
});

export const { toggleSongLike, songAdded, songsAdded } = songsSlice.actions;

export default songsSlice.reducer;