import { formatSong } from './utils';

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
  return fetch(`${searchBaseUrl}${query}`).then(response => response.json());
}

export function getJioSaavnPlaylist() {
  return fetch(
    'https://www.jiosaavn.com/api.php?__call=webapi.get&token=8MT-LQlP35c_&type=playlist&p=1&n=20&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0',
  ).then(response => response.json());
}



export async function trendingSongs() {
  let topSongsList = [];
  var topSongsUrl = "www.jiosaavn.com/api.php?__call=webapi.get&token=RecentlyPlayed&type=playlist&p=1&n=20&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0";
  var songsListJSON = await fetch(topSongsUrl);
  // var songsList = JSON.parse(songsListJSON.text());
  var songsList = songsListJSON.json();
  console.log(songsList);
  // print(songsList);
  // playlists["title"] = songsList["title"];
  // playlists["image"] = songsList["image"];
  topSongsList = songsList["list"];
  for (var i = 0; i < topSongsList.length; i++) {
    try {
      topSongsList[i]['title'] = topSongsList[i]['title']
        .toString()
        .replaceAll("&amp;", "&")
        .replaceAll("&#039;", "'")
        .replaceAll("&quot;", "\"");
      try {
        if (topSongsList[i]["more_info"]["artistMap"]["primary_artists"]
          .length ==
          0) {
          topSongsList[i]["more_info"]["artistMap"]["primary_artists"] =
            topSongsList[i]["more_info"]["artistMap"]["featured_artists"];
        }
        topSongsList[i]["more_info"]["artistMap"]["primary_artists"][0]
        ["name"] = topSongsList[i]["more_info"]["artistMap"]
        ["primary_artists"][0]["name"]
          .toString()
          .replaceAll("&amp;", "&")
          .replaceAll("&#039;", "'")
          .replaceAll("&quot;", "\"");

      } catch (e) {
        topSongsList[i]["more_info"]["artistMap"]["primary_artists"] = [
          { "name": "" }
        ];
      }

      topSongsList[i]['image'] = topSongsList[i]['image']
        .toString()
        .replaceAll("150x150", "500x500");
      topSongsList[i]['subtitle'] = topSongsList[i]['subtitle']
        .toString()
        .replaceAll("&amp;", "&")
        .replaceAll("&#039;", "'")
        .replaceAll("&quot;", "\"");
      console.log(topSongsList);
      return topSongsList;
    } catch (e) {
      console.log("Error in index $i : $e");
    }
  }
}