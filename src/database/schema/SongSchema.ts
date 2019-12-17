export const SONG_SCHEMA_NAME = 'Song';

const SongSchema = {
  name: 'Song',
  properties: {
    album: 'string?',
    artist: 'string?',
    cover: 'string?',
    id: 'string',
    path: 'string',
    title: 'string',
  },
};

export default SongSchema;
