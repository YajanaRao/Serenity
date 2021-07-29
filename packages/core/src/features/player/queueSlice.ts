import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { RootState } from 'store'
import { SongProps } from './types'

type QueueSongs = SongProps & { date: string };

const queueAdapter = createEntityAdapter<QueueSongs>({
    sortComparer: (a, b) => a.date.localeCompare(b.date),
})

const queueSlice = createSlice({
    name: 'queue',
    initialState: queueAdapter.getInitialState(),
    reducers: {
        addSongToQueue: queueAdapter.addOne,
        addSongsToQueue: queueAdapter.updateMany,
        queueUpdated: queueAdapter.updateOne,
        removeSongFromQueue: queueAdapter.removeOne,

        queueReceived(state, action) {
            queueAdapter.setAll(state, action.payload)
        },
    },
})


export const queueSelectors = queueAdapter.getSelectors<RootState>(
    (state) => state.queue
)


export const { addSongToQueue, addSongsToQueue, removeSongFromQueue, queueUpdated, queueReceived } = queueSlice.actions;

export default queueSlice.reducer;
