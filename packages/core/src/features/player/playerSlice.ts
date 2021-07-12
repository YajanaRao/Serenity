// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";


const playerSlice = createSlice({
  name: "player",
  initialState: {
    track: {},
    status: "init",
    repeat: 'repeat-all',
  },
  reducers: {
    // load the song from source and play the song
    play: {
      reducer(state, action) {
        state.track = action.payload;
        state.status = "paused";
      },
      // @ts-ignore
      prepare(track) {
        return { payload: track };
      },
    },



    // change the player status
    updateStatus(state, action) {
      state.status = action.payload;
    },



    // clear queue
    clearQueue(state) {
      state.queue = [];
    },

    // repeat options
    repeatSongs(state, action) {
      state.repeat = action.type;
    }
  },
});

export const selectQueueSongs = (state) => state.player.queue;

export const { play, toggle, updateStatus, clearQueue, addSongToQueue, removeSongFromQueue } = playerSlice.actions;

export default playerSlice.reducer;
