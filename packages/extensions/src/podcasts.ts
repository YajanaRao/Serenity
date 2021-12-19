import * as rssParser from 'react-native-rss-parser';
import Config from 'react-native-config';

const Podcasts = {
    podcastList: [],
    async getPodcasts() {
            const response = await fetch("https://okmuhrunizvusvoypvis.supabase.co/rest/v1/podcasts?select=*", {
                headers: {
                    Apikey: Config.SUPA_BASE,
                    Authorization: `Bearer ${Config.SUPA_BASE}`
                }
            });
            this.podcastList = await response.json();
            return this.podcastList;
    },
    async getPodcast(id: string) {
        const podcast = this.podcastList.find(podcast => podcast.id === id);
        if (!podcast) return [];
        const response = await fetch(podcast.url)
        const responseData = await response.text();
        const rss = await rssParser.parse(responseData);
        const data = rss.items.map((item: any) => {
            let artist = item.authors[0]?.name;
            if (item.itunes.authors.length) artist = item.itunes.authors[0]?.name
            return {
                id: item.id,
                title: item.title,
                artist: artist,
                description: item?.description.replace(/<[^>]+>/g, '').trim(),
                cover: item.itunes.image,
                path: item.enclosures[0].url
            }
        })
        delete rss.items;
        return data;
    }
};

export default Podcasts;