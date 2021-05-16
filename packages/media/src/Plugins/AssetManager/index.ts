import * as data from '../../../assets/Media.json';

const { media } = data;
export function getSongsFromPlaylist(id: string) {
    let songs = [];
    for (let index in media) {
        const playlist = media[index];
        if (playlist.id === id) {
            songs = playlist.children;
        }
    }
    return songs;
}

export function getPlaylists() {
    return media.map(playlist => {
        const playlistMetadata = {
            id: playlist.id,
            name: playlist.title,
            owner: 'Serenity',
            cover: playlist.cover,
        };
        return playlistMetadata;
    })
}