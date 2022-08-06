import Config from 'react-native-config';

const Genre = {
    genres: [],
    async getGenres() {
        const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/genre?select=*", {
            headers: {
                Apikey: Config.SUPA_BASE,
                Authorization: `Bearer ${Config.SUPA_BASE}`
            }
        });
        this.genres = await response.json();
        return this.genres;
},
}

export default Genre;