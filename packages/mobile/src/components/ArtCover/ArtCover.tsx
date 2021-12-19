import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { DefaultImage } from '../DefaultImage';

export interface ArtCoverProps {
    cover: string | null,
    style?: StyleProp<ImageStyle>;
}

export const ArtCover = React.memo(({ cover, style = {} }: ArtCoverProps) => {
    const { colors } = useTheme();
    if (cover) {
        return (
            <FastImage source={{ uri: cover }} style={[styles.artwork, style, { backgroundColor: colors.surface }]} />
        );
    }

    return (
        <DefaultImage size={50} style={[styles.artwork, style]} />
    )
})


const styles = StyleSheet.create({
    artwork: {
        borderRadius: 4,
        height: 50,
        width: 50,
    },
});