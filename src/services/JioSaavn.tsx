function parseSongs(data) {
  const songs = [];
  console.log('jio saavn: ', data);
  data.albums.data.map(item => {
    const song = {
      nid: item.id,
      cover: item.image,
      title: item.title,
      path: item.url,
      artist: item.music,
      type: 'JioSaavn',
    };
    songs.push(song);
  });
  return songs;
}

function parseCollection(data) {
  const songs = [];
  data.list.map(item => {
    const song = {
      nid: item.id,
      cover: item.image,
      title: item.title,
      path: item.more_info.vlink,
      artist: item.subtitle,
      type: 'JioSaavn',
    };
    songs.push(song);
  });
  return songs;
}

export function searchJioSaavnMusic(query) {
  return fetch(
    `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=${query}`,
  )
    .then(response => response.json())
    .then(data => parseSongs(data));
}
export function getJioSaavnMusic() {
  return fetch(
    'https://www.jiosaavn.com/api.php?__call=webapi.get&token=8MT-LQlP35c_&type=playlist&p=1&n=20&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0',
  )
    .then(response => response.json())
    .then(data => parseCollection(data));
}
