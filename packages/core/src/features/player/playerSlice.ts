import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


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
    play(state, action) {
      state.track = action.payload;
      state.status = "paused";
    },

    // change the player status
    updateStatus(state, action) {
      state.status = action.payload;
    },


    // repeat options
    updateRepeatType(state, action) {
      state.repeat = action.payload;
    },

    // radio mode
    // radio mode will infinite loop of songs
    updateRadioMode(state, action) {
      state.radio = action.payload;
    }
  },
});

export const selectQueueSongs = (state: RootState) => state.player.queue;

export const { play, updateStatus, updateRepeatType, updateRadioMode } = playerSlice.actions;

export default playerSlice.reducer;
