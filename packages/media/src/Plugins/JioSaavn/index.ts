import { parseSongs, parseCollection } from "./utils";
import { jioSaavnSearch, getJioSaavnPlaylist, trendingSongs } from './service';

export async function getTopCharts() {
    try {
        const data = await trendingSongs();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export async function searchJioSaavnMusic(query: string) {
    try {
        console.log("searching songs");
        const data = await jioSaavnSearch(query);
        const songs = await parseSongs(data);
        return songs;
    } catch (error) {
        console.log("searchJioSaavnMusic: ", error)
    }
}

export async function getJioSaavnMusic() {
    const data = await getJioSaavnPlaylist();
    const songs = await parseCollection(data);
    return songs;
}
