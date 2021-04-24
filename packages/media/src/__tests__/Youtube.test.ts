import { youtubeSearch } from '../Plugins/Youtube/service';
import { getSongList } from '../Plugins/Youtube/utils';

global.fetch = require("node-fetch");

test('API testing for youtube songs', async (done) => {
    try {
        const response = await youtubeSearch("songs");
        const songs = await getSongList(response);
        expect(songs.length).not.toBe(0);
        done()
    } catch (error) {
        console.log(error)
        expect(error).toBe("Something went wrong");
        done()
    }

});