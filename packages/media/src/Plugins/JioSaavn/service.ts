import { formatSong } from './utils'

const searchBaseUrl =
  'https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=';
const songDetailsBaseUrl =
  'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=';
// const albumDetailsBaseUrl = "https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid="
// const playlistDetailsBaseUrl = "https://www.jiosaavn.com/api.php?__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid="
// const lyricsBaseUrl = "https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id="


export async function getSong(id: string) {
  try {
    const response = await fetch(songDetailsBaseUrl + id);
    const result = await response.json();
    const songData = formatSong(result[id]);
    return songData;
  } catch (error) {
    return null;
  }
}

export function jioSaavnSearch(query: string) {
  return fetch(`${searchBaseUrl}${query}`)
    .then(response => response.json())
}

export function getJioSaavnPlaylist() {
  return fetch(
    'https://www.jiosaavn.com/api.php?__call=webapi.get&token=8MT-LQlP35c_&type=playlist&p=1&n=20&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0',
  )
    .then(response => response.json())
}
