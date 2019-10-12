export const PLAYLIST_SCHEMA_NAME = 'Playlist';

const PlaylistSchema = {
    name: PLAYLIST_SCHEMA_NAME,
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: { type: 'string', indexed: true },
        songs: 'Song[]',
        owner: 'string?'
    }
}

export default PlaylistSchema;