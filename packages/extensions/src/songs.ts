import Config from 'react-native-config';
import { getAudioUrl } from './Plugins/Youtube';
var ytpl = require('react-native-ytpl');

const songs = {
    playlists: [],
    async getPlaylists() {
        const response = await fetch(`${Config.SUPABASE_URL}/playlists?select=*`, {
            headers: {
                Apikey: Config.SUPABASE_TOKEN,
                Authorization: `Bearer ${Config.SUPABASE_TOKEN}`
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
                path: item.url,
                type: 'youtube'
            }
        })
        return data;
    },
    async playSong(url: string) {
        try {
            const ytdlUrl = await getAudioUrl(url);
            return ytdlUrl;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

export default songs;