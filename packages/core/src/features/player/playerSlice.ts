// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";


const playerSlice = createSlice({
  name: "player",
  initialState: {
    track: {},
    status: "init",
    repeat: 'repeat-all',
    radio: false
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


    // repeat options
    repeatSongs(state, action) {
      state.repeat = action.type;
    },

    // radio mode
    // radio mode will infinite loop of songs
    updateRadioMode(state, action) {
      state.radio = action.payload;
    }
  },
});

export const selectQueueSongs = (state) => state.player.queue;

export const { play, updateStatus, repeatSongs, updateRadioMode } = playerSlice.actions;

export default playerSlice.reducer;
