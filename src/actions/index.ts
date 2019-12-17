import { defaultDBSetup } from './realmAction';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const updateTheme = (theme: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  if (theme === 'dark') {
    dispatch({
      payload: 'default',
      type: 'UPDATE_THEME',
    });
  } else {
    dispatch({
      payload: 'dark',
      type: 'UPDATE_THEME',
    });
  }
};

export const defaultSetup = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  defaultDBSetup();
  dispatch({
    payload: true,
    type: 'DEFAULT_SETUP',
  });
};

export const changeRadioMode = (radio: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({
    payload: radio,
    type: 'RADIO_MODE',
  });
};

// const _downloadFileProgress = (data) => {
//   const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
//   const text = `Progress ${percentage}%`;
//   if (percentage == 100) {
//   }
// }

// export const downloadMedia = (item) => dispatch => {
//   try {
//     if(item){
//       RNFS.downloadFile({
//         fromUrl: item.url,
//         toFile: `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`,
//         progress: (data) => _downloadFileProgress(data),
//       }).promise.then(() => {
//         dispatch({
//           type: 'DOWNLOAD',
//           payload: [{
//             title: item.title,
//             url: `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`,
//             artwork: "https://raw.githubusercontent.com/YajanaRao/Serenity/master/assets/icons/app-icon.png",
//             artist: "Serenity"
//           }]
//         })
//       })
//     }
//   } catch (error) {
//   }
// }

// RNFS.readdir(RNFS.DocumentDirectoryPath).then(files => {
//   let response = []
//   _.forEach(files, function (value) {
//     if (_.endsWith(value, 'mp3')){
//       RNFS.exists(RNFS.DocumentDirectoryPath + '/' + value).then(() => {
//         response.push({
//           id: `file:/${RNFS.DocumentDirectoryPath}/${value}`,
//           title: value.split('.')[0],
//           url: `file:/${RNFS.DocumentDirectoryPath}/${value}`,
//           artwork: "https://raw.githubusercontent.com/YajanaRao/Serenity/master/assets/icons/app-icon.png",
//           artist: "Serenity"
//         })
//       })
//     }
//   });
//   dispatch({
//     type: 'OFFLINE',
//     payload: response
//   })
// })
// .catch (err => {
// });
// }
