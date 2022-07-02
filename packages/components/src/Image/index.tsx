import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
// import { DefaultImage } from '/DefaultImage';
import { NeomorphFlex } from 'react-native-neomorph-shadows';

export interface ImageProps {
    source: string | null,
    style?: StyleProp<ImageStyle>;
}

export const Image = React.memo(({ source, style = {} }: ImageProps) => {
    const { colors } = useTheme();
    if (source) {
        return (
            <NeomorphFlex
                // swapShadows // <- change zIndex of each shadow color
                darkShadowColor={'black'}
                lightShadowColor={'white'}
                style={{
                    shadowRadius: 4,
                    borderRadius: 12,
                    // elevation: 12,
                    backgroundColor: colors.surface,
                    //   width: 50,
                    //   height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    //   display: "flex"
                }}
            >
                <FastImage source={{ uri: source }} style={[styles.artwork, style, { backgroundColor: colors.surface }]} />
            </NeomorphFlex>
        );
    }

    return (
        <View style={[styles.artwork, style]} />
    )
})


const styles = StyleSheet.create({
    artwork: {
        borderRadius: 4,
        height: 50,
        width: 50,
    },
});