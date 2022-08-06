import React from 'react';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { artistsSelectors, EntityId } from '@serenity/core';
import { useNavigation } from '@react-navigation/core';
import generate from 'string-to-color';

export interface ArtistProps {
    id: EntityId;
}

export function Artist({ id }: ArtistProps) {
    const artist = useSelector(state => artistsSelectors.selectById(state, id));
    const navigation = useNavigation();

    if (!artist) return null;
    return (
        <List.Item
            title={artist.artist}
            description={`${artist.numberOfSongs} Songs`}
            left={props => (
                <Avatar.Text
                    {...props}
                    size={54}
                    style={{ backgroundColor: generate(artist.artist) }}
                    label={artist.artist.charAt(0)}
                />
            )}
            onPress={() =>
                navigation.navigate('ArtistSongs', {
                    artist,
                })
            }
        />
    );
}
