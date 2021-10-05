import { jioSaavnSearch, getHomePage } from '../Plugins/JioSaavn/service';
import { parseSongs } from '../Plugins/JioSaavn/utils';

global.fetch = require("node-fetch");

test('API testing for searchJioSaavnMusic', async (done) => {
    try {
        const response = await jioSaavnSearch("songs");
        const songs = await parseSongs(response);
        expect(songs.length).not.toBe(0);
        done()
    } catch (error) {
        console.log(error);
        expect(error).toBe("Something went wrong");
        done()    }

});

test('API testing for top tracks', async (done) => {
    try {
        const response = await getHomePage();
        console.log(response)
        const songs = await parseSongs(response);
        expect(songs.length).not.toBe(0);
        done()
    } catch (error) {
        console.log(error);
        expect(error).toBe("Something went wrong");
        done()    }

});
