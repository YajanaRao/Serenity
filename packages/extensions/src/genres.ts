import Config from 'react-native-config';

const Genre = {
    genres: [],
    async getGenres() {
        const response = await fetch(`${Config.SUPABASE_URL}/genre?select=*`, {
            headers: {
                Apikey: Config.SUPABASE_TOKEN,
                Authorization: `Bearer ${Config.SUPABASE_TOKEN}`
            }
        });
        this.genres = await response.json();
        return this.genres;
},
}

export default Genre;