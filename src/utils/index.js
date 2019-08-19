import getArtistTitle from 'get-artist-title';

const getTitleAndArtist = (filename) => {
    metadata = []
    try {
        let [artist, title] = getArtistTitle(filename);
        metadata['artist'] = artist
        metadata['title'] = title
        return metadata 
    } catch (error) {
        console.log(error)
        return false
    }
}

fetchLyrics = () => {
   let uri =  `https://azlyrics.com/lyrics/${artistName}/${songName}.html`;
   fetch(uri).then((response) => {
       console.log(response);
   })
   .catch((error) => {
       console.log(error);
   })
}

export const getLyrics = async (song) => {
    try {
        if(song.artist && song.title){
            fetchLyrics();
            lyric = ""
            return lyric
        }else {
            let metadata = getTitleAndArtist(song.fileName)
            if(metadata){
                
                return lyric
            }
        }
    } catch (error) {
        
    }
}