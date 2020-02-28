// http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json

import Integration from './Integration';
import { Song } from '../actionTypes';

export default class LastFM extends Integration {
  constructor(private accessKey) {
    super();
  }

  format = (data: [], id, title, image, artist) => {
    let song: any = {};
    song['id'] = data[id];
    song['title'] = data[title];
    song['image'] = data[image][2]['#text'];
    song['artist'] = data[artist]['name'];
    song['album'] = '';
    return song;
  };

  getData = (): Promise<any> => {
    return new Promise((resovle, reject) => {
      fetch(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json`,
      )
        .then(response => response.json())
        .then(async response => {
          let data = response.tracks.track;
          console.log(data);
          let results: Song[] = [];
          for (const child of data) {
            let song: Song = this.format(
              child,
              'playcount',
              'name',
              'image',
              'artist',
            );
            console.log(song);
            results.push(song);
          }
          return results;
        })
        .then(data => resovle(data))
        .catch(error => reject(error));
    });
  };
}
