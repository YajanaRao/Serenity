import * as React from 'react';
import { Image, View } from 'react-native';
import { useAppSelector } from '@serenity/core'
import { Card, Title, Text } from '@serenity/components';


export function PlayerBar() {
    // @ts-ignore
    const { track } = useAppSelector(state => state.player);

    return (
        <Card style={{ padding: 12, flexDirection: "row", position: "absolute", bottom: 0, width: "100%" }}>
            <Image source={{ uri: track.cover }} style={{ height: 50, width: 50 }} />
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 12 }}>
                <Title>{track.title}</Title>
                <Text>{track.artist}</Text>
            </View>
        </Card>
    );
}