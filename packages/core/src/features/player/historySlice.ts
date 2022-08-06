// @ts-nocheck
import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { RootState } from 'store'

type Song = { id: string; title: string, date: string }

const historyAdapter = createEntityAdapter<Song>({
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.date.localeCompare(b.date),
})

const historySlice = createSlice({
    name: 'history',
    initialState: historyAdapter.getInitialState(),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        addSongToHistory: historyAdapter.addOne,
        historyUpdated: historyAdapter.updateOne,
        removeSongFromHistory: historyAdapter.removeOne,
        clearHistory: historyAdapter.removeAll,
        historyReceived(state, action) {
            // Or, call them as "mutating" helpers in a case reducer
            historyAdapter.setAll(state, action.payload.history)
        },
    },
})


export const historySelectors = historyAdapter.getSelectors<RootState>(
    (state) => state.history
)


export const { addSongToHistory, historyUpdated, removeSongFromHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer;
