import Realm from 'realm';

import PlaylistSchema from './schema/PlaylistSchema';
import SongSchema from './schema/SongSchema';
import ArtistSchema from './schema/ArtistSchema';
import AlbumSchema from './schema/AlbumSchema';

const realm = new Realm({
  schema: [PlaylistSchema, SongSchema, ArtistSchema, AlbumSchema],
});

export default realm;
