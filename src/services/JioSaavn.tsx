const searchBaseUrl =
  'https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=';
const songDetailsBaseUrl =
  'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=';
// const albumDetailsBaseUrl = "https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid="
// const playlistDetailsBaseUrl = "https://www.jiosaavn.com/api.php?__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid="
// const lyricsBaseUrl = "https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id="

function parseSongs(data) {
  const songs = [];
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

function format(string: string) {
  return decodeURI(encodeURI(string))
    .replace('&quot;', "'")
    .replace('&amp;', '&')
    .replace('&#039;', "'");
}

function formatSong(data) {
  // try {
  let url = data.media_preview_url;
  url = url.replace('preview', 'aac');
  if (data['320kbps'] === true) {
    url = url.replace('_96_p.mp4', '_320.mp4');
  } else {
    url = url.replace('_96_p.mp4', '_160.mp4');
  }
  // except KeyError or TypeError:
  // data['media_url'] = decrypt_url(data['encrypted_media_url'])
  // if data['320kbps'] != "true":
  //   data['media_url'] = data['media_url'].replace("_320.mp4", "_160.mp4")
  const image = data.image.replace('150x150', '500x500');

  const song = {
    nid: data.id,
    cover: format(image),
    title: format(data.song),
    path: url,
    artist: format(data.singers),
    type: 'JioSaavn',
  };
  // data.song = format(data.song)
  // data.music = format(data.music)
  // data.singers = format(data.singers)
  // data.starring = format(data.starring)
  // data.album = format(data.album)
  // data.primary_artists = format(data.primary_artists)
  // data.image = data.image.replace("150x150", "500x500")
  return song;
}

async function parseCollection(data) {
  // console.log("data: ", data)
  const songs = [];
  await Promise.all(
    data.list.map(async item => {
      // const url = item.more_info.vlink
      // try {
      // console.log(item)
      //   url = item.media_preview_url
      //   console.log(url)
      //   url = url.replace("preview", "aac")
      //   if (item['320kbps'] == true) {
      //     url = url.replace("_96_p.mp4", "_320.mp4")
      //   }
      //   else {
      //     url = url.replace("_96_p.mp4", "_160.mp4")
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
      // const song = {
      //   nid: item.id,
      //   cover: item.image,
      //   title: item.title,
      //   path: url,
      //   artist: item.subtitle,
      //   type: 'JioSaavn',
      // };
      const song = await getSong(item.id);
      songs.push(song);
    }),
  );
  return songs;
}

async function getSong(id: string) {
  try {
    // console.log("url: ", songDetailsBaseUrl + id)
    // fetch(songDetailsBaseUrl + id).then(response => response.text()).then(response => {
    //   console.log("response: ", response)
    // }).catch(error => {
    //   console.log(error);
    // })
    const response = await fetch(songDetailsBaseUrl + id);
    const result = await response.json();
    const songData = formatSong(result[id]);
    return songData;
  } catch (error) {
    return null;
  }
}

export function searchJioSaavnMusic(query: string) {
  return fetch(`${searchBaseUrl}${query}`)
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
