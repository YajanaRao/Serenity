import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SongProps } from '@serenity/core';
import { DefaultImage } from '../../../components/DefaultImage';
import { Image, Text } from '@serenity/components';
import { Neomorph } from 'react-native-neomorph-shadows';
import { useTheme } from 'react-native-paper';

export interface TrackProps {
    track: SongProps;
    onPress: (track: SongProps) => void;
}

export function Track({ track, onPress }: TrackProps) {
    return (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => onPress(track)}
        >
            {/* <Neomorph
                // swapShadows // <- change zIndex of each shadow color
                darkShadowColor={'black'}
                lightShadowColor={'white'}
                style={{
                    shadowRadius: 6,
                    borderRadius: 12,
                    backgroundColor: colors.surface,
                    width: 120,
                    height: 120,
                    justifyContent: "center",
                    alignItems: "center",
                    //   display: "flex"
                }}
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
            </Neomorph> */}

            <Image source={track.cover} style={styles.photo}/>
            <Text numberOfLines={2} style={styles.title}>
                {track?.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        marginBottom: 4,
        marginTop: 14,
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
        // elevation: 4,
        height: 120,
        width: 120,
        backgroundColor: 'transparent'
    },
});


