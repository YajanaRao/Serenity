import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { PermissionsAndroid } from 'react-native';
import { updateOfflineReadAccess, updateTheme } from "./uiSlice";

export function toggleTheme() {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
        const { themeType } = getState().ui;
        if (themeType === "default") {
            dispatch(updateTheme("dark"));
        } else {
            dispatch(updateTheme("default"));
        }
    }
}

export function giveReadOfflineAccess() {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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
            console.log(granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                dispatch(updateOfflineReadAccess(true));
            } else {
                dispatch(updateOfflineReadAccess(false));
            }
        }).catch(err => {
            console.error('giveReadOfflineAccess', err);
            return false;
        });
    }
}