import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Youtube } from '@serenity/extensions';


export const updateQuery = (query: string, category: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  if (query) {
    const media = [];
    try {
      const offlineMedia = await RNAndroidAudioStore.search({
        searchParam: query,
      });
      if (offlineMedia && offlineMedia.length) {
        media.push({
          title: 'Offline Songs',
          data: offlineMedia,
        });
      }
      // if (category !== 'offline') {
      //   const songs = await searchSongs(query);
      //   if (songs.length) media.concat(songs);
      // }
      dispatch({
        type: 'UPDATE_QUERY',
        payload: media,
      });
    } catch (error) {
      console.error("Search", error);
      dispatch({
        type: 'UPDATE_QUERY',
        payload: false,
      });
    }
  }
};

export const findAlbumSongs = async (album: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    album,
  })
    .catch(er => log.error('findAlbumSongs', er));
  return songs;
};
export const findArtistSongs = async (artist: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    artist,
  })
    .then(media => media)
    .catch(er => log.error('findArtistSongs', er));
  return songs;
};

export const filterSongsByGenre = async (genre: string) => {
  try {
    const songs = await RNAndroidAudioStore.getSongsByGenres({ genre });
    if (!songs.length) {
      return Youtube.searchYoutubeMusic(genre);
    }
    return songs;

  } catch (error) {
    log.error('filterSongsByGenre', error)
  }
};

export const mostPlayedSongs = (array: []) => orderBy(
  values(groupBy(array, 'title')).map(group => ({
    ...group[0],
    count: group.length,
  })), 'title', 'asc'
);
