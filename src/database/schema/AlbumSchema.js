export const ALBUM_SCHEMA_NAME = 'Album';

const AlbumSchema = {
  name: ALBUM_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: {type: 'string', indexed: true},
    cover: 'string?',
    artist: 'string?',
  },
};

export default AlbumSchema;
