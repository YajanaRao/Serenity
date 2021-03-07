import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { log } from '../utils/logging';

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

export async function parsePlaylists(data: any) {
  if ('error' in data) {
    return [];
  }
  const items = await Promise.all(
    data.items.map(async item => {
      const children = await getPlaylistSongs(item.id.playlistId);
      const playlist = {
        id: item.id,
        cover: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        children,
      };
      return playlist;
    }),
  );

  return items;
}

export async function getPlaylistSongs(playlistId: string) {
  const playlistItemUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${Config.YOUTUBE_API_KEY}`;
  const accessToken = await AsyncStorage.getItem('@token');
  return fetch(playlistItemUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      return parsePlaylistItem(data);
    });
}

// const playlistUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=id&id=${playlistId}&key=${apiKey}`

export async function getYoutubeMusic(query: string) {
  log('fetching youtube videos');
  const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${query}&key=${Config.YOUTUBE_API_KEY}`;
  const accessToken = await AsyncStorage.getItem('@token');
  return fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => parsePlaylists(data));
}
