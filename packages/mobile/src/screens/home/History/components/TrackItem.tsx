import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { EntityId, historySelectors, SongProps } from '@serenity/core';
import { DefaultImage } from 'components/DefaultImage';
import { Text } from '@serenity/components';

export interface TrackItemProps {
    id: EntityId;
    onPress: (track: SongProps) => void;
}

export function TrackItem({ id, onPress }: TrackItemProps) {
    const track = useSelector(state => historySelectors.selectById(state, id));
    return (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => onPress(track)}
        >
            {track?.cover ? (
                <FastImage
                    source={{
                        uri: track.cover,
                    }}
                    style={[styles.photo]}
                />
            ) : (
                <DefaultImage style={styles.photo} />
            )}

            <Text numberOfLines={1} style={styles.title}>
                {track?.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        marginBottom: 4,
        marginLeft: 12,
        width: 120,
    },
    title: {
        fontSize: 12,
        marginTop: 8,
        padding: 0,
        fontFamily: 'Nunito-Bold',
        includeFontPadding: false,
    },
    photo: {
        borderRadius: 12,
        elevation: 4,
        height: 120,
        width: 120,
        backgroundColor: 'gray'
    },
});


