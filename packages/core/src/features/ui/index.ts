import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { updateTheme } from "./uiSlice";

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