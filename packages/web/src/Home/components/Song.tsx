import * as React from 'react';
import { Image, View } from 'react-native';
import { Hoverable, Title, Text } from '@serenity/components';
import { songsSelectors, useAppSelector, Player, useAppDispatch } from '@serenity/core';

export interface SongProps {
    id: any;
}

export function Song({ id }: SongProps) {
    const dispatch = useAppDispatch();

    const song = useAppSelector(state => songsSelectors.selectById(state, id));
    function playSong(song: any) {
        dispatch(Player.playSong(song))
    }
    if (song) {

        return (
            <Hoverable style={{ margin: 8, padding: 4 }} onPress={() => playSong(song)}>
                {/* <Card style={{ margin: 12 }}> */}
                <Image source={{ uri: song.cover }} style={{ height: 150, width: 150, borderRadius: 8 }} />
                <View style={{ margin: 8 }}>
                    <Title>{song.title}</Title>
                    <Text>{song.artist}</Text>
                </View>
                {/* </Card> */}
            </Hoverable>
        );
    }
    return null;
}
