import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { EntityId, SongProps, songsSelectors, useAppSelector } from '@serenity/core';
import { ArtCover } from 'components/ArtCover/ArtCover';

export interface SongItemProps {
    id: EntityId;
    onPress: (song: SongProps) => void;
    openMenu: (id: EntityId) => void;
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
            left={props => (
                <ArtCover cover={song.cover} />
            )}
            right={props => (
                <IconButton
                    {...props}
                    icon="more-vertical-outline"
                    onPress={() => openMenu(id)}
                />
            )}
            onPress={() => onPress(song)}
        />
    );
}

export const SongItem = React.memo(Song)
