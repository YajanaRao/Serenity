import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SongProps } from '@serenity/core';
import { DefaultImage } from '../../../components/DefaultImage';
import { Text, Title } from '@serenity/components';

export interface MeditationProps {
    track: SongProps;
    onPress: (track: SongProps) => void;
}

export function Meditation({ track, onPress }: MeditationProps) {
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
            <View style={styles.textContainer}>
                <Title numberOfLines={2} style={styles.title}>
                    {track?.title}
                </Title>
                <Text numberOfLines={2} style={styles.title}>
                    {track?.author}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        // alignItems: 'center',
        marginBottom: 4,
        marginLeft: 12,
        width: 340,
    },
    textContainer: {
        marginTop: 8,
    },
    title: {
        padding: 0,
        fontFamily: 'Nunito-Bold',
        includeFontPadding: false,
    },
    photo: {
        borderRadius: 12,
        elevation: 4,
        height: 188,
        width: 336,
        backgroundColor: 'gray'
    },
});


