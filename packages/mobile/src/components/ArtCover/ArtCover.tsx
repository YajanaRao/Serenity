import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DefaultImage } from '../DefaultImage';

export interface ArtCoverProps {
    cover: string | null
}

export const ArtCover = React.memo(({ cover }: ArtCoverProps) => {
    if (cover) {
        return (
            <FastImage source={{ uri: cover }} style={styles.artwork} />
        );
    }

    return (
        <DefaultImage style={styles.artwork} />
    )
})


const styles = StyleSheet.create({
    artwork: {
        backgroundColor: '#d7d1c9',
        borderRadius: 4,
        height: 50,
        width: 50,
    },
});