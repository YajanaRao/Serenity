import * as React from 'react';
import { Meditation } from './Meditation';
import { Podcast } from './Podcast';
import { Track } from './Track';

export function Media({ item, onPress }) {
    switch (item.type) {
        case 'music':
            return <Track track={item} onPress={onPress} />
        case 'podcast':
            return <Podcast track={item} onPress={onPress} />
        case 'meditation':
            return <Meditation track={item} onPress={onPress} />
        default:
            return null;
    }
}