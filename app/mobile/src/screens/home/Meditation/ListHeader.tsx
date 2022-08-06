import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Title, Text } from '@serenity/components'
import { Container } from '@serenity/components';

interface ListHeaderProps {
    title: string;
    description?: string;
    cover: string;
    addSongsToQueue(): void;
}

export const ListHeader = ({
    title,
    description,
    cover,
    addSongsToQueue,
}: ListHeaderProps) => (
    <Container>
        <View style={styles.coverContainer}>
            {cover ? (
                <FastImage source={{ uri: cover }} style={styles.artCover} />
            ) : null}
        </View>
        <View style={styles.titleContainer}>
            <Title>{title}</Title>
            {description ? <Text>{description}</Text> : null}
        </View>
    </Container>
);

const styles = StyleSheet.create({
    coverContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        margin: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 8,
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