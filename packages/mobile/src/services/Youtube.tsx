import Config from 'react-native-config';
import { getAccessToken } from '../utils';
import { log } from '../utils/logging';


export function parsePlaylistItem(data: any) {
  const items = [];
  if ('error' in data) {
    log.error('parsePlaylistItem', data);
    return false;
  }
  data.items.map(item => {
    const song = {
      id: item.id,
      cover: item.snippet.thumbnails.default?.url,
      title: item.snippet.title,
      path: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      artist: item.snippet.channelTitle,
      type: 'Youtube',
    };
    items.push(song);
  });
  return items;
}

export async function parsePlaylists(data: any) {
  if ('error' in data) {
    log.error('parsePlaylists', data);
    return false;
  }
  const items = await Promise.all(
    data.items.map(async item => {
      const children = await getPlaylistSongs(item.id.playlistId);
      const playlist = {
        id: item.id,
        cover: item.snippet.thumbnails.default?.url,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        children,
      };
      return playlist;
    }),
  );
  return items;
}
export async function parseUserPlaylists(data: any) {
  if ('error' in data) {
    log.error('parseUserPlaylists', data);
    return false;
  }
  const items = await Promise.all(
    data.items.map(async item => {
      const children = await getPlaylistSongs(item.id);
      const playlist = {
        id: item.id,
        cover: item.snippet.thumbnails.default?.url,
        name: item.snippet.title,
        owner: item.snippet.channelTitle,
        songs: children,
        type: 'Youtube',
      };
      return playlist;
    }),
  );
  return items;
}

export async function getPlaylistSongs(playlistId: string) {
  const playlistItemUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${Config.YOUTUBE_API_KEY}`;
  const accessToken = await getAccessToken();
  return fetch(playlistItemUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => parsePlaylistItem(data));
}

export async function getYoutubeMusic(query: string) {
  const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${query}&key=${Config.YOUTUBE_API_KEY}`;
  const accessToken = await getAccessToken();
  return fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => parsePlaylists(data))
    .catch(error => log.error('getYoutubeMusic', error));
}



export async function getYoutubePlaylist() {
  if (!Config.YOUTUBE_API_KEY) {
    log.error('config error', `react-native-config is ${Config.toString()}`);
    return null;
  }
  // const accessToken = await AsyncStorage.getItem('@token');
  const accessToken = await getAccessToken();

  const playlistUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=20&mine=true&key=${Config.YOUTUBE_API_KEY}`;
  return fetch(playlistUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => parseUserPlaylists(data))
    .catch(error => log.error('getYoutubePlaylist', error));
}
