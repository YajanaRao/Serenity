import AsyncStorage from '@react-native-async-storage/async-storage';

export function parsePlaylistItem(data: any) {
  const items = [];
  if ('error' in data) {
    return [];
  }
  data.items.map(item => {
    const song = {
      nid: item.id,
      cover: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
      path: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      artist: item.snippet.channelTitle,
      type: 'Youtube',
    };
    items.push(song);
  });
  return items;
}

export function parsePlaylist(data) {
  const items = [];
  data.items.map(item => {
    const song = {
      nid: item.id,
      cover: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
      path: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      artist: item.id.videoId,
      type: 'Youtube',
    };
    items.push(song);
  });
  return items;
}

const apiKey = 'AIzaSyAec--go0k_paTfh0zbcgXoZtV-Df2Vuys';
const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=music&key=${apiKey}`;
// const playlistItemUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${apiKey}`

// const playlistUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=id&id=${playlistId}&key=${apiKey}`

export async function getYoutubeMusic() {
  const accessToken = await AsyncStorage.getItem('@token');
  return fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      return parsePlaylist(data);
    });
}
