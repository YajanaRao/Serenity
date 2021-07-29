import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { PermissionsAndroid, Platform } from 'react-native';
import { updateOfflineReadAccess, updateTheme } from "./uiSlice";

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