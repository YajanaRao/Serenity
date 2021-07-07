import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';

export const giveReadOfflineAccess = () => {
  try {
    if (Platform.OS === "ios") {
      return true
    } else {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE && PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(status => {
        if (status) {
          return true;
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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
            } else {
              return false;
            }
          });
        }
      });
    }

  } catch (err) {
    console.error('giveReadOfflineAccess', err);
  }
};

export const giveWriteOfflineAccess = () => {
  try {
    if (Platform.OS === "ios") {
      return false;
    } else {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(status => {
        if (status) {
          return true;
        } else {
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
            } else {
              return false;
            }
          });
        }
      });
    }

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
  },
  reducers: {
    hideIntroSlides(state, action) {
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
    }
  },
});

export const selectIntroSlides = (state) => state.ui.introSlidesShown;
export const selectThemeType = (state) => state.ui.themeType;


export const { hideIntroSlides, updateTheme } =
  uiSlice.actions;

export default uiSlice.reducer;
