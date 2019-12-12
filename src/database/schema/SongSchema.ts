export const SONG_SCHEMA_NAME = 'Song';

const SongSchema = {
  name: 'Song',
  properties: {
    id: 'string',
    title: 'string',
    cover: 'string?',
    artist: 'string?',
    album: 'string?',
    path: 'string',
  },
};

export default SongSchema;
