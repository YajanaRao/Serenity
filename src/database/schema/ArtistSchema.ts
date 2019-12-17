export const ARTIST_SCHEMA_NAME = 'Artist';

const ArtistSchema = {
  name: ARTIST_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    cover: 'string?',
    id: 'string',
    name: { type: 'string', indexed: true },
  },
};

export default ArtistSchema;
