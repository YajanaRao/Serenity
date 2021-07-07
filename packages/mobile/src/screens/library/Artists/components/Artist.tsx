import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import generate from 'string-to-color';
import { selectArtistById } from '@serenity/core';

export interface ArtistProps {
    id: string;
}

export function Artist({ id }: ArtistProps) {
    const artist = useSelector(state => selectArtistById(state, id));
    const navigation = useNavigation();
    return (
        <List.Item
            title={artist.artist}
            left={() => (
                <Avatar.Text
                    size={54}
                    style={{ backgroundColor: generate(artist.artist) }}
                    label={artist.artist.charAt(0)}
                />
            )}
            onPress={() => {
                navigation.navigate('ArtistSongs', {
                    artist: artist,
                });
            }}
        />
    );
}
