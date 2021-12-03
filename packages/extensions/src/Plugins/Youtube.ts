import ytdl from 'react-native-ytdl';

export function getAudioUrl(youtubeUrl: string) {
    return ytdl(youtubeUrl, { filter: format => format.container === 'mp4' })
        .then(urls => {
            const { url } = urls[0];
            return url;
        });
}