import { getAudioUrl } from "./Plugins/Youtube";
import Config from 'react-native-config';

var ytpl = require('react-native-ytpl');

const Meditations = {
    meditationList: [],
    async getMeditations() {
        const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/meditations?select=*", {
            headers: {
                Apikey: Config.SUPA_BASE,
                Authorization: `Bearer ${Config.SUPA_BASE}`
            }
        });
        this.meditationList = await response.json();
        return this.meditationList;
    },
    async getMeditation(url: string) {
        const playlist = await ytpl(url);
        const data = playlist.items.map((item: any) => {
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
    async playMeditation(url: string) {
        const ytdlUrl = await getAudioUrl(url);
        return ytdlUrl;
    }
};

export default Meditations;