// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
//  case 'NOTIFY':
// return {
//   ...state,
//   message: action.payload,
// };

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    introSlidesShown: false,
    offlineReadAccessGiven: false,
    offlineWriteAccessGiven: false,
    themeType: Appearance.getColorScheme(),
    notify: '',
  },
  reducers: {
    hideIntroSlides(state) {
      state.introSlidesShown = true;
    },
    updateTheme(state, action) {
      state.themeType = action.payload;
    },
    updateOfflineReadAccess(state, action) {
      state.offlineReadAccessGiven = action.payload;
    },
    updateOfflineWriteAccess(state, action) {
      state.offlineWriteAccessGiven = action.payload;
    },
    updateNotification(state, action) {
      state.notify = action.payload;
    }
  },
});

export const selectIntroSlides = (state) => state.ui.introSlidesShown;
export const selectThemeType = (state) => state.ui.themeType;


export const { hideIntroSlides, updateTheme, updateOfflineReadAccess, updateNotification } =
  uiSlice.actions;

export default uiSlice.reducer;
