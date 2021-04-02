export const ALBUM_SCHEMA_NAME = 'Album';

const AlbumSchema = {
  name: ALBUM_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    artist: 'string?',
    cover: 'string?',
    id: 'string',
    name: { type: 'string', indexed: true },
  },
};

export default AlbumSchema;
