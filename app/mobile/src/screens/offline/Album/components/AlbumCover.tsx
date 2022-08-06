import * as React from 'react';
import { DefaultImage } from 'components/DefaultImage';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

export interface AlbumCoverProps {
    uri: string;
}

function Cover({ uri }: AlbumCoverProps) {
    if (uri) {
        return (
            <FastImage
                source={{ uri }}
                style={styles.icons}
            />)
    }
    return <DefaultImage style={styles.icons} />
}

export const AlbumCover = React.memo(Cover);

const styles = StyleSheet.create({
    icons: {
        width: 50,
        borderRadius: 4,
        backgroundColor: '#d7d1c9',
    },
});
