import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Title, Text, Button } from '@serenity/components'
import { Container } from '@serenity/components';

interface ListHeaderProps {
    title: string;
    description?: string;
    cover: string;
    onPress: () => void;
}

export const ListHeader = ({
    title,
    description,
    cover,
    onPress
}: ListHeaderProps) => (
    <Container>
        <View style={styles.coverContainer}>
            {cover ? (
                <FastImage source={{ uri: cover }} style={styles.artCover} />
            ) : null}
        </View>
        <View style={styles.titleContainer}>
            <Title>{title}</Title>
            {description ? <Text numberOfLines={0}>{description}</Text> : null}
        </View>
        <Button onPress={onPress} style={styles.buttonContainer}>
            Play All
        </Button>
    </Container>
);

const styles = StyleSheet.create({
    coverContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        margin: 12,
    },
    buttonContainer: {
        margin: 12,
    },
    artCover: { width: 324, height: 180, elevation: 4, borderRadius: 12, backgroundColor: 'lightgray' },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    fillContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
// 94 * 2