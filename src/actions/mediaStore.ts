import RNAndroidAudioStore from 'react-native-get-music-files';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import RNFS from 'react-native-fs';
import ytdl from 'react-native-ytdl';

import { log } from '../utils/logging';
import { searchYoutubeMusic } from '../services/Youtube';

export const updateQuery = (query: string, category: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  if (query) {
    const media = [];

    const offlineMedia = await RNAndroidAudioStore.search({
      searchParam: query,
    });
    if (offlineMedia && offlineMedia.length) {
      media.push({
        title: 'Offline Songs',
        data: offlineMedia,
      });
    }

    if (category !== 'offline') {
      const youtubeSongs = await searchYoutubeMusic(query);
      if (youtubeSongs && youtubeSongs.length) {
        media.push({
          title: 'Youtube Music',
          data: youtubeSongs,
        });
      }
    }
    dispatch({
      type: 'UPDATE_QUERY',
      payload: media,
    });
  } else {
    dispatch({
      type: 'UPDATE_QUERY',
      payload: false,
    });
  }
};

export const getOfflineSongs = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  RNAndroidAudioStore.getAll({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: media,
      });
    })
    .catch(er => {
      log.error('getOfflineSongs', er);
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: [],
      });
    });
};

export const getOfflineArtists = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  RNAndroidAudioStore.getArtists({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_ARTISTS',
        payload: media,
      });
    })
    .catch(er => {
      log.error('getOfflineArtists', er);
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong',
      });
    });
};

export const getOfflineAlbums = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  RNAndroidAudioStore.getAlbums({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_ALBUMS',
        payload: media,
      });
    })
    .catch(er => {
      log.error('getOfflineAlbums', er);
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong',
      });
    });
};

export const findAlbumSongs = async (album: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    album,
  })
    .then(media => {
      return media;
    })
    .catch(er => log.error('findAlbumSongs', er));
  return songs;
};

export const findArtistSongs = async (artist: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    artist,
  })
    .then(media => {
      return media;
    })
    .catch(er => log.error('findArtistSongs', er));
  return songs;
};

export const filterSongsByGenre = async genre => {
  const songs = await RNAndroidAudioStore.getSongsByGenres({ genre })
    .then(media => {
      return media;
    })
    .catch(error => log.error('filterSongsByGenre', error));
  return songs;
};

export const mostPlayedSongs = (array: []) => {
  return orderBy(
    values(groupBy(array, 'title')).map(group => ({
      ...group[0],
      count: group.length,
    })),
  );
};

const _downloadFileProgress = data => {
  const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
  const text = `Progress ${percentage}%`;
  console.log('download file progress: ', text);
  // if (percentage == 100) {
  // }
};

export const downloadMedia = item => dispatch => {
  try {
    if (item) {
      if (item.type.toLowerCase() === 'youtube') {
        ytdl(item.path, { filter: format => format.container === 'mp4' })
          .then(urls => {
            const { url } = urls[0];
            RNFS.downloadFile({
              fromUrl: url,
              toFile: `${RNFS.DownloadDirectoryPath}/${item.title}.mp3`,
              progress: data => _downloadFileProgress(data),
            }).promise.then(res => {
              console.log(
                res,
                `${RNFS.DownloadDirectoryPath}/${item.title}.mp3`,
              );
              // dispatch({
              //   type: 'DOWNLOAD',
              //   payload: [{
              //     title: item.title,
              //     url: `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`,
              //     artwork: item.cover,
              //     artist: "Serenity"
              //   }]
              // })
              dispatch({
                payload: `File ${item.title} downloaded successfully`,
                type: 'NOTIFY',
              });
            });
          })
          .catch(error => {
            log.error(`loadTrack ${path} from youtube`, error);
            dispatch({
              payload: `loadTrack ${path} from youtube failed`,
              type: 'NOTIFY',
            });
          });
      } else if (item.type.toLowerCase() === 'jiosaavn') {
        RNFS.downloadFile({
          fromUrl: item.path,
          toFile: `${RNFS.DownloadDirectoryPath}/${item.title}.mp3`,
          progress: data => _downloadFileProgress(data),
        }).promise.then(res => {
          console.log(res, `${RNFS.DownloadDirectoryPath}/${item.title}.mp3`);

          dispatch({
            payload: `File ${item.title} downloaded successfully`,
            type: 'NOTIFY',
          });
        });
      }
    }
  } catch (error) {
    log.error(error);
  }
};
