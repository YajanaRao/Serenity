import RNFS from 'react-native-fs';
import { giveWriteOfflineAccess } from './userActions';
import { includes } from 'lodash';

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
        console.error('checkFolderPath', error);
    }
}


export const downloadMedia = (item: TrackProps) => async (
    dispatch,
    getState,
) => {
    try {
        if (item) {
            const { offlineWriteAccessGiven } = getState().user;
            if (!offlineWriteAccessGiven) {
                dispatch({
                    payload: `Download songs by Granting Storage Permission`,
                    type: 'NOTIFY',
                });
                dispatch(giveWriteOfflineAccess());
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
                const url = await Youtube.getDownloadUrl(item.path);
                let title = item.title.replace(/[^a-zA-Z ]/g, '');
                if (title.length > 18) {
                    title = title.slice(0, 18);
                }
                title = title.trim();
                const filePath = `${folderPath}/${title}.mp3`;
                item.path = filePath;
                await download(url, filePath);
            }
            else if ('jiosaavn' === item.type.toLowerCase()) {
                const filePath = `${folderPath}/${item.title.trim()}.m4a`;
                const imagePath = `${folderPath}/${item.title.trim()}_artwork.jpg`;
                const audioResponse = await download(item.path, filePath);
                const imageResponse = await download(item.cover, imagePath);
                item.path = filePath;
                console.debug('downloadMedia', audioResponse.toString());
            }
            else if (includes(['online'], item.type.toLowerCase())) {
                const filePath = `${folderPath}/${item.title.trim()}.mp3`;
                const response = await download(item.path, filePath);
                item.path = filePath;
                console.debug('downloadMedia', response.toString());
            }
            dispatch({
                payload: `File ${item.title} downloaded successfully`,
                type: 'NOTIFY',
            });
        }
    } catch (error) {
        console.error('downloadMedia', error);
        dispatch({
            payload: `downloadMedia ${item.title} from youtube failed`,
            type: 'NOTIFY',
        });
    }
};
