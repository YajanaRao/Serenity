import { combineReducers } from 'redux';

import _ from 'lodash';

const INITIAL_QUERY = {
  query: ""
};



const INITIAL_THEME = {
  themeType: false
};

const INITIAL_STATE = {
  result: "",
  queue: [],
  active: {}
}

const DASHBOARD_STATE = {
  topAlbums: [],
  topTracks: [],
  topArtists: [],
  charts: [],
  genres: [],
  newAlbums: [],
  topKannada: []
}

const SETTINGS_STATE = {
  isConnected: false
}

const mediaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DOWNLOAD':
      return {
        ...state,
        result: action.payload
      }

    case 'OFFLINE':
      console.log("offline media", action.payload)
      return {
        ...state,
        files: action.payload
      }
     
    case 'PLAY':
        return {
          ...state,
          active: action.payload,
          queue: _.concat(action.payload, state.queue)
        }
      
    case 'ACTIVE_TRACK_UPDATE':
      return {
        ...state,
        active: action.payload
      }
    case 'UPDATE_QUEUE': 
      if (_.isEmpty(state.active)){
        return {
          ...state,
          active: _.head(action.payload),
          queue: action.payload
        }
      }
      return {
        ...state,
        queue: action.payload
      }
    
    case 'CLEAR_QUEUE':
        return {
          ...state,
          queue: action.payload,
          active: {}
        }
    default:
      return state;
  }
};

const queryReducer = (state = INITIAL_QUERY, action) => {
  switch (action.type) {
    case 'UPDATE_QUERY':
      console.log("Update query",action);
      return {
        ...state,
        query: action.payload
      }
    default:
      return state;
  }
};

const themeReducer = (state = INITIAL_THEME, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return {
        ...state,
        themeType: action.payload
      }
    default:
      return state;
  }
}

const settingsReducer = (state = SETTINGS_STATE, action) => {
  switch(action.type){
    case 'NET_INFO':
      console.log("is connected",action.payload);
      return {
        ...state,
        isConnected: action.payload
      }
    default: 
      return state;
  }
}

const dashboardReducer = (state = DASHBOARD_STATE, action) => {
  switch (action.type) {
    case 'TOP_ALBUMS':
      return {
        ...state,
        topAlbums: action.payload
      }
    case 'TOP_TRACKS':
      return {
        ...state,
        topTracks: action.payload
      }
    case 'TOP_ARTISTS':
      return {
        ...state,
        topArtists: action.payload
      }
    case 'JIO_SAVAN_CHARTS':
      return {
        ...state,
        charts: action.payload
      }
    case 'JIO_SAVAN_GENRES':
      return {
        ...state,
        genres: action.payload
      }
    case 'JIO_SAVAN_NEW_ALBUMS':
      return {
        ...state,
        newAlbums: action.payload
      }
    case 'TOP_KANNADA':
      return {
        ...state,
        topKannada: action.payload
      }
    default:
      return state;
  }
}

export default combineReducers({
  query: queryReducer,
  theme: themeReducer,
  media: mediaReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer
});