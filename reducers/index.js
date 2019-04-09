import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';

const INITIAL_QUERY = {
  query: ""
};

const _retrieveData = () => {
  try {
    let value = AsyncStorage.getItem('THEME');
    console.log("asyncstorage get data",value);
    if (value == null) {
      value = 'dark';
    }
    return value
  } 
  catch (error) {
    return 'light'
  }
};

const _storeData = (data) => {
  try {
    console.log("Async storage data",data);
    AsyncStorage.setItem('THEME', data);
  } catch (error) {
    // Error saving data
  }
};

const INITIAL_THEME = {
  themeType: _retrieveData()
};



const queryReducer = (state = INITIAL_QUERY, action) => {
  switch (action.type) {
    case 'UPDATE_QUERY':
      console.log("Update query",action);
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
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
      console.log("Update theme",action);
      
      var themeType;
      if(state.themeType === "light"){
        themeType = "dark"
      }
      else {
        themeType = "light"
      }
      _storeData(themeType);
      return {
        ...state,
        themeType: themeType
      }
    default:
      return state;
  }
}


export default combineReducers({
  query: queryReducer,
  themeType: themeReducer
});