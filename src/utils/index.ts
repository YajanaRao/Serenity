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

export default getLyrics;
