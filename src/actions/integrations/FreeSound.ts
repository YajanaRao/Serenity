import Integration from './Integration';

export default class FreeSound extends Integration {
  constructor(private accessKey) {
    super();
  }

  format = (data: [], id, title, image) => {
    let song = {};
    song['id'] = data[id];
    song['title'] = data[title];
    song['image'] = data[image];
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
          let request = await fetch(
            `https://freesound.org/apiv2/sounds/${data[0].id}/?token=gKpUyvuPdDWvF10h9uzPLc9KFTZumKeYbvB87XDu`,
          );
          data = await request.json();
          data = this.format(data, 'id', 'name', 'images');
          return data;
        })
        .then(data => resovle(data))
        .catch(error => reject(error));
    });
  };
}
