import RNAndroidAudioStore from '@yajanarao/react-native-get-music-files';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import RNFS from 'react-native-fs';
import ytdl from 'react-native-ytdl';
import { RNFFmpeg } from 'react-native-ffmpeg';

import { includes } from 'lodash';
import { log } from '../utils/logging';
import { searchYoutubeMusic } from '../services/Youtube';
import { addSong } from './realmAction';
import { TrackProps } from '../types';
import { clearFileMetadata } from '../services/FFmpeg';

const DOWNLOADED_ID = 'user-playlist--000004';

export const addSongToDownloads = (song: TrackProps) => {
  addSong(DOWNLOADED_ID, song, true);
};

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
      console.log('offlineSongs: ', media);
      if (media === 'Something get wrong with musicCursor') {
        media = [];
      }
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

function download(url: string, filePath: string) {
  const { promise } = RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    progress: data => _downloadFileProgress(data),
  });
  return promise;
}

async function checkFolderPath(folderPath: string) {
  try {
    const isPresent = await RNFS.exists(folderPath);
    if (!isPresent) {
      await RNFS.mkdir(folderPath);
    }
  } catch (error) {
    log.error('checkFolderPath', error);
  }
}

export const downloadMedia = (item: TrackProps) => async (
  dispatch,
  getState,
) => {
  try {
    if (item) {
      const { offlineAccessGiven } = getState().user;
      if (!offlineAccessGiven) {
        dispatch({
          payload: `Download songs by Granting Storage Permission`,
          type: 'NOTIFY',
        });
        return;
      }
      dispatch({
        payload:
          'Started download. You will be notified once the file is downloaded',
        type: 'NOTIFY',
      });
      const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Music`;
      await checkFolderPath(folderPath);
      if (item.type.toLowerCase() === 'youtube') {
        const urls = await ytdl(item.path, { quality: 'highestaudio' });
        const { url } = urls[0];
        let title = item.title.replace(/[^a-zA-Z ]/g, '');
        if (title.length > 18) {
          title = title.slice(0, 18);
        }
        title = title.trim();
        const file = `${folderPath}/${title}`;
        // const tempPath = `${folderPath}/_${title}`;
        // const album = item.album || 'Single';
        await download(url, file);
        // const result = await RNFFmpeg.execute(
        //   `-y -i ${tempPath}  -c:a libmp3lame -b:a 256k "${file}"`,
        // );
        // log.debug(`FFmpeg process exited.`, result);
        // const response = await RNFFmpeg.execute(
        //   `-y -i "${tempPath}" -i ${item.cover}  -map_metadata 0 -map 0 -map 1 -codec copy -id3v2_version 3 -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)" "${filePath}"`,
        // );
        // log.debug(`FFmpeg process exited`, response);
        // item.path = filePath;
        // log.debug('downloadMedia', response.toString());
        const filePath = await clearFileMetadata(file);
        console.log(filePath);
        const result = await RNFFmpeg.execute(
          `-y -i "${filePath}" -c:a libmp3lame -b:a 256k "${file}.mp3"`,
        );
        console.log(result);
        RNFS.unlink(filePath);
        RNFS.unlink(file);
        // RNFS.unlink(filePath);
      } else if (includes(['jiosaavn', 'online'], item.type.toLowerCase())) {
        const filePath = `${folderPath}/${item.title.trim()}.mp3`;
        const response = await download(item.path, filePath);
        item.path = filePath;
        log.debug('downloadMedia', response.toString());
      }
      addSongToDownloads(item);
      dispatch({
        payload: `File ${item.title} downloaded successfully`,
        type: 'NOTIFY',
      });
    }
  } catch (error) {
    log.error(error);
    dispatch({
      payload: `downloadMedia ${item.path} from youtube failed`,
      type: 'NOTIFY',
    });
  }
};
