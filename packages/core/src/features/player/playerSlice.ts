import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


const playerSlice = createSlice({
  name: "player",
  initialState: {
    track: {},
    repeat: 'repeat-all',
    radio: false
  },
  reducers: {
    // load the song from source and play the song
    playTrack(state, action) {
      state.track = action.payload;
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

export const { playTrack, updateRepeatType, updateRadioMode } = playerSlice.actions;

export default playerSlice.reducer;
