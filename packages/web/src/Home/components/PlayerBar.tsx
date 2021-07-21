import * as React from 'react';
import { Image, View, TouchableHighlight } from 'react-native';
import { useAppDispatch, useAppSelector, Player } from '@serenity/core'
import { Card, Title, Text, Icon } from '@serenity/components';


export function PlayerBar() {
    const dispatch = useAppDispatch();
    // @ts-ignore
    const { track, status } = useAppSelector(state => state.player);

    React.useEffect(() => {
        // @ts-ignore
        dispatch(Player.setUpTrackPlayer(track));
        // @ts-ignore
        return dispatch(Player.destroyTrackPlayer());
    }, []);

    function toggle() {
        // @ts-ignore
        dispatch(Player.toggle())
    }
    return (
        <Card style={{ padding: 12, flexDirection: "row", position: "absolute", bottom: 0, width: "100%" }}>
            <Image source={{ uri: track.cover }} style={{ height: 50, width: 50 }} />
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 12 }}>
                <Title>{track.title}</Title>
                <Text>{track.artist}</Text>
            </View>
            <TouchableHighlight onPress={toggle} >
                <Icon name={status === "playing" ? "pause" : "play"} />
            </TouchableHighlight>
        </Card>
    );
}