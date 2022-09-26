import * as React from 'react';
import { Player, SongProps, useAppDispatch } from '@serenity/core';
import { View, StyleSheet } from 'react-native';
import { useTheme, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { ArtCover } from '../../../../components/ArtCover/ArtCover';

interface Props {
    track: SongProps;
}

export const SongItem = ({ track }: Props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();


    const play = () => {
        if (track) dispatch(Player.playSong(track));
        navigation.goBack();
    };

    if (!track) return null;
    return (
        <View style={[styles.surface, { backgroundColor: colors.background }]}>
            <List.Item
                title={track?.title}
                description={track?.artist || track?.album}
                left={() => <ArtCover cover={track?.cover} />}
                onPress={() => play()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    surface: {
        padding: 0,
        margin: 0,
        borderRadius: 4,
    },
});