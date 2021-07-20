import * as React from 'react';
import { Image, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Card, Title } from '@serenity/components';
import { songsSelectors, useAppSelector, Player, useAppDispatch } from '@serenity/core';

export interface SongProps {
    id: any;
}

export function Song({ id }: SongProps) {
    const dispatch = useAppDispatch();

    const song = useAppSelector(state => songsSelectors.selectById(state, id));
    function playSong(song: any) {
        // @ts-ignore
        dispatch(Player.playSong(song))
    }
    if (song) {

        return (
            <TouchableRipple onPress={() => playSong(song)}>
                <Card style={{ margin: 12 }}>
                    <Image source={{ uri: song.cover }} style={{ height: 200, width: 200 }} />
                    <View style={{ margin: 8 }}>
                        <Title>{song.title}</Title>
                    </View>
                </Card>
            </TouchableRipple>
        );
    }
    return null;
}
