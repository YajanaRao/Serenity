import * as JioSaavn from "./Plugins/JioSaavn";
import * as Youtube from "./Plugins/Youtube";

export async function searchSongs(query: string) {
    const media = [];
    const jioSaavnSongs = await JioSaavn.searchJioSaavnMusic(query);
    if (jioSaavnSongs && jioSaavnSongs.length) {
        media.push({
            title: 'JioSaavn Music',
            data: jioSaavnSongs,
        });
    }

    const youtubeSongs = await Youtube.searchYoutubeMusic(query);
    if (youtubeSongs && youtubeSongs.length) {
        media.push({
            title: 'Youtube Music',
            data: youtubeSongs,
        });
    }
    return media;
}