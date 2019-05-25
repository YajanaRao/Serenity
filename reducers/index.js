import { combineReducers } from 'redux';
// import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const INITIAL_QUERY = {
  query: ""
};

// const  _retrieveData = async () => {
//   try {
//     let value = await AsyncStorage.getItem('PREFERENCES');
//     const preferences = JSON.parse(value);
//     if (preferences) {
//       return preferences.theme === 'dark' ? DarkTheme : DefaultTheme;  
//     }
//   }
//   catch (error) {
//     console.log(error);
//   }
// };



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
    case 'PROGRESS':
      console.log(action.payload)
      return {
        ...state
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
          queue: _.concat(state.queue,action.payload),
          active: action.payload
        }
      
    case 'ADD_TO_QUEUE': 
      if (_.isEmpty(state.active)){
        console.log("active song is",_.head(action.payload))
        return {
          ...state,
          queue: _.uniq(_.concat(state.queue, action.payload)),
          active: _.head(action.payload)
        }
      }
      return {
        ...state,
        queue: _.uniq(_.concat(state.queue, action.payload))
      }
    
    case 'REMOVE_FROM_QUEUE':
        console.log("removing",action.payload);
        if(_.isEqual(action.payload, state.active)){
          return {
            ...state
          }
        }
        _.remove(state.queue, function (item) {
          return _.isEqual(item, action.payload)
        })
        return {
          ...state,
          queue: state.queue
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