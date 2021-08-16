import Config from 'react-native-config';
import { getAudioUrl } from './Plugins/Youtube';
var ytpl = require('react-native-ytpl');

const songs = {
    playlists: [],
    async getPlaylists() {
        const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/playlists?select=*", {
            headers: {
                Apikey: Config.SUPA_BASE,
                Authorization: `Bearer ${Config.SUPA_BASE}`
            }
        });
        const playlists = await response.json();
        return playlists;
    },
    async getSongs(playlist) {
        const songs = await ytpl(playlist.url);
        const data = songs.items.map((item: any) => {
            let artist = item.author?.name;
            return {
                id: item.id,
                title: item.title,
                artist: artist,
                description: item?.duration,
                cover: item.thumbnails[0].url,
                path: item.url
            }
        })
        return data;
    },
    async playSong(url: string) {
        const ytdlUrl = await getAudioUrl(url);
        return ytdlUrl;
    }
}

export default songs;