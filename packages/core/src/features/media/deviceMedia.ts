// @ts-ignore
import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import { Platform } from 'react-native';


/**
 * wrapper function around audio store
 * @returns albums
 */
export function getAlbums() {
    if (Platform.OS !== "web") {
        return RNAndroidAudioStore.getAlbums({});
    }
}

/**
 * wrapper function around audio store
 * @returns artists
 */
export function getArtists() {
    if (Platform.OS !== "web") {
        return RNAndroidAudioStore.getArtists({});
    }
}

/**
 * wrapper around audio store to get songs
 * @returns songs
 */
export function getSongs() {
    if (Platform.OS !== "web") {
        return RNAndroidAudioStore.getAll({});
    }
}