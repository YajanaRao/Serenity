import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { addToPlaylist } from "./playlistsSlice";

export function addSongToPlaylist(playlistId: number, songId: number){
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const payload = {
            playlistId, 
            songId
        }
        dispatch(addToPlaylist(payload));
    }
}