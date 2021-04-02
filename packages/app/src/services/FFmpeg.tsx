import { RNFFprobe, RNFFmpeg } from 'react-native-ffmpeg';

/// Gets the file Extension of any Media [File]
export async function getMediaFormat(mediaFile: string) {
  let _codec;
  let _info;
  const streamsInfoArray = (
    await RNFFprobe.getMediaInformation(mediaFile)
  ).getAllProperties();
  _codec = `${streamsInfoArray.streams[0].codec_name}`;
  _info = `${streamsInfoArray.format.format_name}`;
  if (_codec === 'aac') return 'm4a';
  if (_codec === 'opus') return 'ogg';
  if (_codec === 'mp3') return 'mp3';
  if (_info === 'matroska,webm') return 'webm';
  if (_info === 'mov,mp4,m4a,3gp,3g2,mj2') return 'mp4';
  return _info;
}

export async function clearFileMetadata(inputFile: string) {
  const fileFormat = await getMediaFormat(inputFile);
  const output = `${inputFile}.${fileFormat}`;
  console.log('output file format: ', output);
  const argsList = [
    '-i',
    inputFile,
    '-map',
    '0:a',
    '-codec:a',
    'copy',
    '-map_metadata',
    '-1',
    `${output}`,
  ];
  const result = await RNFFmpeg.executeWithArguments(argsList);
  if (result === 1)
    throw Error(
      'Cannot Clear Metadata\n' +
        'audioFile: $audioFile\n' +
        'argument list: $_argsList\n' +
        'output: $output',
    );
  return output;
}
