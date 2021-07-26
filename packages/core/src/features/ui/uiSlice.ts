// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { Appearance, PermissionsAndroid, Platform } from 'react-native';





export const checkReadOfflineAccess = () => PermissionsAndroid.check(
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE && PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
)
export const giveWriteOfflineAccess = () => {
  try {
    if (Platform.OS === "ios") {
      return false;
    }
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(status => {
      if (status) {
        return true;
      }
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Grant Access',
          message:
            'Serenity App needs access to your EXTERNAL_STORAGE ' +
            'so you can play offline songs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
        return false;

      });

    });


  } catch (err) {
    console.error('giveWriteOfflineAccess', err);
  }
};


const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    introSlidesShown: false,
    offlineReadAccessGiven: false,
    offlineWriteAccessGiven: false,
    themeType: Appearance.getColorScheme(),
    notify: false,
  },
  reducers: {
    hideIntroSlides(state) {
      state.introSlidesShown = true;
    },
    updateTheme(state, action) {
      state.themeType = action.payload;
    },
    updateOfflineReadAccess(state, action) {
      console.log(action);
      state.offlineReadAccessGiven = action.payload;
    },
    updateOfflineWriteAccess(state, action) {
      state.offlineWriteAccessGiven = action.payload;
    }
  },
});

export const selectIntroSlides = (state) => state.ui.introSlidesShown;
export const selectThemeType = (state) => state.ui.themeType;


export const { hideIntroSlides, updateTheme, updateOfflineReadAccess } =
  uiSlice.actions;

export default uiSlice.reducer;
