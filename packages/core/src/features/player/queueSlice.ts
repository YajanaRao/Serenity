import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { SongProps } from './types'

type QueueSongs = SongProps & { date: string };

const queueAdapter = createEntityAdapter<QueueSongs>({
    sortComparer: (a, b) => a.date?.localeCompare(b.date),
})

const queueSlice = createSlice({
    name: 'queue',
    initialState: queueAdapter.getInitialState(),
    reducers: {
        addSongToQueue(state, action) {
            action.payload["date"] = new Date().toISOString();
            queueAdapter.addOne(state, action);
        },
        addSongsToQueue(state, action) {
            action.payload = action.payload.map((song: QueueSongs) => {
                song["date"] = new Date().toISOString()
                return song;
            })
            queueAdapter.addMany(state, action)
        },
        queueUpdated: queueAdapter.updateOne,
        removeSongFromQueue: queueAdapter.removeOne,
        clearQueue: queueAdapter.removeAll,

        queueReceived(state, action) {
            queueAdapter.setAll(state, action.payload)
        },
    },
})


export const queueSelectors = queueAdapter.getSelectors<RootState>(
    (state) => state.queue
)


export const { addSongToQueue, addSongsToQueue, removeSongFromQueue, queueUpdated, queueReceived, clearQueue } = queueSlice.actions;

export default queueSlice.reducer;
