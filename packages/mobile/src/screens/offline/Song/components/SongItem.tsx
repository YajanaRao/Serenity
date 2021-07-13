import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { songsSelectors, useAppSelector } from '@serenity/core';
import { TrackProps } from '../../../../utils/types';

export interface SongItemProps {
    id: number;
    onPress: (song: TrackProps) => void;
    openMenu: (song: TrackProps) => void;
}

function Song({ id, onPress, openMenu }: SongItemProps) {
    const song = useAppSelector(state => songsSelectors.selectById(state, id))
    if (!song) {
        return null;
    }
    return (
        <List.Item
            title={song.title}
            description={song.artist || song.album}
            right={props => (
                <IconButton
                    {...props}
                    icon="more-vertical-outline"
                    onPress={() =>
                        openMenu(song)
                    }
                />
            )}
            onPress={() => onPress(song)}
        />
    );
}

export const SongItem = React.memo(Song)
