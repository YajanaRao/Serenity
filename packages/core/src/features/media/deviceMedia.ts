// @ts-ignore
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import { Platform, DeviceEventEmitter } from 'react-native';
import { albumAdded } from './albumsSlice';
import { artistsAdded } from './artistsSlice';
import { songsAdded } from './songsSlice';


/**
 * wrapper function around audio store
 * @returns albums
 */
export function getAlbums() {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        if (Platform.OS !== "web") {
            const albums = await RNAndroidAudioStore.getAlbums({});
            dispatch(albumAdded(albums));
        }
    }
}

/**
 * wrapper function around audio store
 * @returns artists
 */
export function getArtists() {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        if (Platform.OS !== "web") {
            const artists = await RNAndroidAudioStore.getArtists({});
            dispatch(artistsAdded(artists));
        }
    }
}

/**
 * wrapper around audio store to get songs
 * @returns songs
 */
export function getSongs() {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        if (Platform.OS !== "web") {
            RNAndroidAudioStore.getAll({ batchNumber: 1 });
            // console.log(songs.length);
            // dispatch(songsAdded(songs));
            DeviceEventEmitter.addListener(
                'onBatchReceived',
                (params) => {
                    dispatch(songsAdded(params.batch));
                    // this.setState({songs : [
                    //     ...this.state.songs,
                    //     ...params.batch
                    // ]});
                }
            )

        }
    }
}