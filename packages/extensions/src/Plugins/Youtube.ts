import ytdl from 'react-native-ytdl';

export function getAudioUrl(youtubeUrl: string) {
    let videoUrl = youtubeUrl;
    if (!ytdl.validateURL(youtubeUrl)) {
        const url = new URL(youtubeUrl);
        const videoId = url.searchParams.get("v")?.split("=")[1];
        videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    }
    return ytdl(videoUrl, { filter: format => format.container === 'mp4' })
        .then(urls => {
            const { url } = urls[0];
            return url;
        });
}