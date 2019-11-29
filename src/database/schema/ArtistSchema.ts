export const ARTIST_SCHEMA_NAME = 'Artist';

const ArtistSchema = {
  name: ARTIST_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: { type: 'string', indexed: true },
    cover: 'string?',
  },
};

export default ArtistSchema;
