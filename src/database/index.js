import Realm from 'realm';

import PlaylistSchema from './schema/PlaylistSchema';
import SongSchema from './schema/SongSchema';

const realm = new Realm({
    schema: [
        PlaylistSchema,
        SongSchema,
    ],
});

export default realm;