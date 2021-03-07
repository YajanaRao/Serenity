import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { log } from './logging';

const fetchLyrics = (artistName: string, songName: string) => {
  const uri = `https://azlyrics.com/lyrics/${artistName}/${songName}.html`;
  fetch(uri)
    .then(response => {
      // console.log(response);
      return response;
    })
    .catch(error => {
      // console.log(error);
      return error;
    });
};

const getLyrics = async song => {
  try {
    let lyric = '';
    if (song.artist && song.title) {
      lyric = fetchLyrics(song.artist, song.title);
    }
    return lyric;
  } catch (error) {
    return error;
  }
};

async function validateAccessToken(token: string) {
  const validationUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
  const response = await fetch(validationUrl);
  const message = await response.json();
  if ('error' in message) {
    log.error('validateAccessToken', message);
    return false;
  }
  return true;
}

export async function getAccessToken() {
  const token = await AsyncStorage.getItem('@token');
  const isValid = await validateAccessToken(token);
  log.debug('getAccessToken', `Is token valid: ${isValid}`);
  if (!isValid) {
    const { accessToken } = await GoogleSignin.getTokens();
    AsyncStorage.setItem('@token', accessToken);
    return accessToken;
  }
  return token;
}

export default getLyrics;
