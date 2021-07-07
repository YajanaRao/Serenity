import { createSlice } from "@reduxjs/toolkit";
import { TrackPlayer } from "react-track-player";

function loadTrack(track) {
  return TrackPlayer.load({
    path: track.path,
    title: track.title,
    artist: track.artist,
    cover: track.cover,
  });
}


const playerSlice = createSlice({
  name: "player",
  initialState: {
    track: {},
    queue: [],
    history: [],
    status: "init",
    repeat: 'repeat-all',
  },
  reducers: {
    // load the song from source and play the song
    playSong: {
      reducer(state, action) {
        if (state.track.id) {
          state.history.push(state.track.id);
        }
        console.log(action);
        state.track = {
          ...action.payload,
          date: new Date().toUTCString(),
        };
        state.status = "paused";
        loadTrack(state.track);
      },
      prepare(track) {
        return { payload: track };
      },
    },
    // add the song the queue
    addSongToQueue: {
      reducer(state, action) {
        state.queue = state.queue.concat(action.payload);

      },
      prepare(track) {
        const ids = [];
        if (Array.isArray(track)) {
          for (const song of track) {
            ids.push(song.id);
          }
        } else if (track.id) {
          ids.push(track.id);
        }
        return { payload: ids };
      },
    },

    // remove songs from queue
    removeSongFromQueue: {
      reducer(state, action) {
        state.queue = state.queue.filter(id => id !== action.payload)
      },
      prepare(id) {
        return { payload: id };
      }
    },

    // remove songs from history
    removeSongFromHistory: {
      reducer(state, action) {
        state.history = state.history.filter(id => id !== action.payload)
      },
      prepare(id) {
        return { payload: id };
      }
    },

    // change the player status
    updateStatus(state, action) {
      state.status = action.payload;
    },
    // toggle player status
    toggle(state, action) {
      if (state.status === "playing") {
        TrackPlayer.pause();
      } else if (state.status === "paused") {
        TrackPlayer.play();
      } else if (state.status === "init") {
        loadTrack(state.track).then(() => {
          TrackPlayer.play()
        });
      } else {
        console.log("another status: ", state.status)
      }
    },

    // clear history
    clearHistory(state, action) {
      state.history = [];
    },

    // clear queue
    clearQueue(state, action) {
      state.queue = [];
    },

    // repeat options
    repeatSongs(state, action) {
      state.repeat = action.type;
    }
  },
});

export const selectQueueSongs = (state) => state.player.queue;
export const selectHistorySongs = (state) => state.player.history;

// return null when queue is empty
export const selectNextSong = (state) => {
  const queue = selectQueueSongs(state);
  return queue.length ? queue[0] : null;
}

// return null when history is empty
export const selectPreviousSong = (state) => {
  const history = selectHistorySongs(state);
  return history.length ? history[0] : null;
}

export const { playSong, toggle, updateStatus, clearHistory, clearQueue, addSongToQueue, removeSongFromQueue, removeSongFromHistory } = playerSlice.actions;

export default playerSlice.reducer;
