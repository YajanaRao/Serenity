import * as rssParser from 'react-native-rss-parser';

const Podcasts = {
    podcastList: [{
        id: '1',
        title: 'Naval',
        author: 'Naval',
        cover: 'https://ssl-static.libsyn.com/p/assets/5/c/e/b/5ceb9fba4ff0ab14/podcast_artwork.jpg',
        url: 'https://naval.libsyn.com/rss',
        description: "Naval"

    }, {
        id: '2',
        title: 'Tim Ferriss Show',
        author: 'Tim Ferriss',
        cover: 'https://content.production.cdn.art19.com/images/22/c6/59/4c/22c6594c-7a13-4eb3-acfc-099d850a04ce/fa19a18e90828c0e120e2f97d733d4d75a0f58acb65ce27b956a8134afda926686fd6fee2d9660e20c115fc6be55f32b3132625c4ac23ed09df740921bbffa7a.jpeg',
        url: 'https://timferriss.libsyn.com/rss',
        description: "Tim Ferriss: Bestselling Author, Human Guinea Pig"
    }, {
        id: '3',
        title: 'Huberman Lab',
        author: 'Dr. Andrew Huberman',
        description: "Dr. Andrew Huberman",
        url: 'https://hubermanlab.libsyn.com/rss',
        cover: 'https://ssl-static.libsyn.com/p/assets/f/7/d/9/f7d9cdda658759cb/Huberman-Lab-Podcast-Thumbnail-2000x2000.jpg'
    }, {
        id: '4',
        title: 'Sadhguru Podcast',
        author: 'Sadhguru',
        description: 'Sadhguru',
        cover: 'https://files.hubhopper.com/podcast/316340/1400x1400/sadhguru.jpg?v=1612347490',
        url: 'https://feeds.hubhopper.com/cf7fbc47963d87fed1ad5e2e5c2faef0.rss'
    },
    {
        id: '5',
        title: 'Art of Living Podcast',
        author: 'Sri Sri Ravi Shankar',
        description: 'Gurudev Sri Sri Ravi Shankar',
        cover: 'https://production.listennotes.com/podcasts/wisdom-talks-with-gurudev-K69vUydWqQh-aV-oOUiAPsm.1400x1400.jpg',
        url: 'https://feeds.hubhopper.com/0c9f20e6f9ba679f03cc80aeb4feef9b.rss'
    }
    ],
    getPodcasts() {
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
        console.log(rss);
        return data;
    }
};

export default Podcasts;