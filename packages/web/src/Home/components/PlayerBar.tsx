import * as React from 'react';
import { Image, View } from 'react-native';
import { useAppDispatch, useAppSelector, Player } from '@serenity/core'
import { Card, Title, Text } from '@serenity/components';
import { ProgressBar, usePlaybackState } from 'react-track-player';
import { IconButton } from 'react-native-paper';

export function PlayerBar() {
    const dispatch = useAppDispatch();
    const { track } = useAppSelector(state => state.player);
    const status = usePlaybackState();

    React.useEffect(() => {
        dispatch(Player.setUpTrackPlayer());
        return Player.destroyTrackPlayer();
    }, [dispatch]);

    function toggle() {
        // @ts-ignore
        if(status === "playing"){
            Player.pause();
        } else {
            Player.pause();
        }
    }
    
    return (
        <Card style={{ padding: 12, flexDirection: "row", position: "absolute", bottom: 0, width: "100%", justifyContent: "space-around" }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Image source={{ uri: track.cover }} style={{ height: 50, width: 50 }} />
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 12 }}>
                    <Title>{track.title}</Title>
                    <Text>{track.artist}</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <IconButton icon={"skip-back-outline"} />
                <IconButton icon={status === "playing" ? "pause" : "play"} onPress={toggle} />
                <IconButton icon={"skip-forward-outline"} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ProgressBar />
            </View>
        </Card>
    );
}