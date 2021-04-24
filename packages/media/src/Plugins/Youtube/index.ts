import ytdl from 'react-native-ytdl';
import { youtubeSearch } from './service';
import { getSongList } from './utils';

export function getAudioUrl(youtubeUrl: string) {
    return ytdl(youtubeUrl, { filter: format => format.container === 'mp4' })
        .then(urls => {
            const { url } = urls[0];
            console.log(url)
            return url;
        });
}

export async function getDownloadUrl(youtubeUrl: string) {
    const urls = await ytdl(youtubeUrl, { quality: 'highestaudio' });
    const { url } = urls[0];
    return url
}



export async function searchYoutubeMusic(query: string) {
    // log.debug('searchYoutubeMusic', 'fetching youtube videos');
    try {
        const page = await youtubeSearch(query);
        const songs = await getSongList(page);
        return songs;
    } catch (error) {
        console.error('searchYoutubeMusic', error);
    }
}