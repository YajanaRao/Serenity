import { getSong } from './service';

export async function parseSongs(data) {
  // const songs = [];
  const songs = await Promise.all(data.songs.data.map(async item => {
    const song = await getSong(item.id);
    return song;
  }));
  return songs;
}

export async function parseCollection(data) {
  // console.log("data: ", data)
  const songs = [];
  await Promise.all(
    data.list.map(async item => {
      const song = await getSong(item.id);
      songs.push(song);
    }),
  );
  return songs;
}




export function formatSong(data) {
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
    id: data.id,
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


function format(string: string) {
  return string
    .replace('&quot;', "'")
    .replace(/&quot;/g, '"')
    .replace('&amp;', '&')
    .replace('&#039;', "'");
}
