import * as React from 'react';
import { Image, View } from 'react-native';
import { Hoverable, Title, Text } from '@serenity/components';
import { Player, SongProps, useAppDispatch } from '@serenity/core';

export function Song({song}: {song: SongProps}) {
    const dispatch = useAppDispatch();

    console.log(song);
    function playSong(song: any) {
        dispatch(Player.playSong(song))
    }
    if (song) {

        return (
            <Hoverable style={{ margin: 8, width: 150 }} onPress={() => playSong(song)}>
                {/* <Card style={{ margin: 12 }}> */}
                <Image source={{ uri: song.cover }} style={{ height: 150, width: 150, borderRadius: 8 }} />
                <View style={{ margin: 8 }}>
                    <Title>{song.title}</Title>
                    {/* <Text>{song.artist}</Text> */}
                </View>
                {/* </Card> */}
            </Hoverable>
        );
    }
    return null;
}
