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


export const getLyrics = async (song) => {
    try {
        if(song.artist && song.title){
            // let lyric = await lyrics.search(song.artist, song.title)
            lyric = ""
            return lyric
        }else {
            let metadata = getTitleAndArtist(song.fileName)
            if(metadata){
                let lyric = await lyrics.search(song.artist, song.title); 
                return lyric
            }
        }
    } catch (error) {
        
    }
}