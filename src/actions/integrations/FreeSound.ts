import Integration from './Integration';
import { Song } from '../actionTypes';

export default class FreeSound extends Integration {
  constructor(private accessKey) {
    super();
  }

  format = (data: [], id, title, image, artist) => {
    let song: any = {};
    song['id'] = data[id];
    song['title'] = data[title];
    song['image'] = data[image]['spectral_bw_m'];
    song['artist'] = data[artist];
    song['album'] = '';
    return song;
  };

  getData = (): Promise<any> => {
    return new Promise((resovle, reject) => {
      fetch(
        `https://freesound.org/apiv2/search/text/?query=cars&token=gKpUyvuPdDWvF10h9uzPLc9KFTZumKeYbvB87XDu`,
      )
        .then(response => response.json())
        .then(async response => {
          let data = response.results;
          let results: Song[] = [];
          for (const child of data) {
            if (child.id) {
              let request = await fetch(
                `https://freesound.org/apiv2/sounds/${child.id}/?token=gKpUyvuPdDWvF10h9uzPLc9KFTZumKeYbvB87XDu`,
              );
              let node = await request.json();
              let song: Song = this.format(
                node,
                'id',
                'name',
                'images',
                'username',
              );
              results.push(song);
            }
          }
          return results;
        })
        .then(data => resovle(data))
        .catch(error => reject(error));
    });
  };
}
