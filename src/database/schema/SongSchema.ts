export const SONG_SCHEMA_NAME = 'Song';

const SongSchema = {
  name: 'Song',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    artwork: 'string?',
    artist: 'string?',
    album: 'string?',
    url: 'string',
  },
};

export default SongSchema;
