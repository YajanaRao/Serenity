// import Config from 'react-native-config';
import { getAudioUrl } from '../Plugins/Youtube';

const songs = {
    playlists: [],
    async getPlaylists() {
        const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/playlists?select=*", {
            headers: {
                Apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODUyODgwNywiZXhwIjoxOTQ0MTA0ODA3fQ.WB2Y8fiLoExX5VlAXHwC_gF7HiUonqx1xTMIibrVAY4",
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODUyODgwNywiZXhwIjoxOTQ0MTA0ODA3fQ.WB2Y8fiLoExX5VlAXHwC_gF7HiUonqx1xTMIibrVAY4"}`
            }
        });
        const playlists = await response.json();
        return playlists;
    },
    async getSongs(playlist) {
        return [];
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