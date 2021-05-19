export const PLAYLIST_SCHEMA_NAME: string = 'Playlist';

const PlaylistSchema = {
  name: PLAYLIST_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: { type: 'string', indexed: true },
    owner: 'string?',
    songs: 'Song[]',
  },
};

export default PlaylistSchema;
