import { getAudioUrl } from "../Plugins/Youtube";

var ytpl = require('react-native-ytpl');

const Meditations = {
    meditationList: [{
        id: '1',
        title: 'Isha Upa Yoga',
        author: 'Sadhguru',
        cover: 'https://i.ytimg.com/vi/Jf5qUhz-FVk/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA87i0p4VzOVnl9IrO53DkJjGCAgw',
        url: 'https://youtube.com/playlist?list=PL3uDtbb3OvDMd3kUaU7uJgujVpsURetBm',
        description: "Isha Yoga is not just a practice – it is a living phenomenon. When you do it like an offering, it changes the very fundamentals of who you are. - Sadhguru"

    }, {
        id: '2',
        title: '21 Day Meditation Challenge With Gurudev',
        author: 'Gurudev Sri Sri Ravi Shankar',
        cover: 'https://i.ytimg.com/vi/v1vRphAv7C4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCkam5gwuIb7HFrz2NKgRH38IPbcQ',
        url: 'https://youtube.com/playlist?list=PLH-0HZ0SQ_PF8YaQAGLhXN1KE-9Wg3i1M',
        description: "21 Day Meditation Challenge With Gurudev: In the next 21 days of this challenge discover how meditation is effortless and rewarding when done under the right guidance. Let us cultivate a New Habit of Meditation in this 21 days challenge. Millions from around the world are taking up this challenge. Every meditation is very special and perfect for all.Even if you are a beginner or regular meditator you will have a different experience in every meditation. There is a wide range of meditations like meditation for beginners, meditations for relaxation, meditation for anxiety, stress relief, chakra meditations, meditations for positive energy, open eye meditations, and much more."
    }, {
        id: '3',
        title: 'Heartfulness Meditation',
        author: 'Heartfulness Way ',
        description: "From stress management to realization",
        url: 'https://youtube.com/playlist?list=PL9qv2XnOFkATwb570dFWpMXCNbYXSkkej',
        cover: 'https://i.ytimg.com/vi/gDClb-yjNdQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA4Sz1b2IxhprdRs9Ku7BQdVKhhIg'
    }, {
        id: '4',
        title: '10 Minute Meditation',
        author: 'Goodful',
        description: 'Take a moment to clear your mind and find your inner calm.',
        cover: 'https://i.ytimg.com/vi/O-6f5wQXSu8/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB6QcPyM4N6c88CiExxPEnkF2hwOQ',
        url: 'https://youtube.com/playlist?list=PLQiGxGHwiuD1kdxsWKFuhE0rITIXe-7yC'
    },
    {
        id: '5',
        title: 'Covid-19 Meditations',
        author: 'Raja Choudhury',
        description: 'Raja Choudhury',
        cover: 'https://i.ytimg.com/vi/mcQNyDDK7CI/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC7d23-s8gE5OR2jA--6GsAaFhQ6Q',
        url: 'https://youtube.com/playlist?list=PLzdHq7SUd0pql9Slms1KiTKubVFVWafps'
    }
    ],
    getMeditations() {
        return this.meditationList;
    },
    async getMeditation(id: string) {
        const meditation = this.meditationList.find(meditation => meditation.id === id);
        if (!meditation) return [];

        const playlist = await ytpl(meditation.url);
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