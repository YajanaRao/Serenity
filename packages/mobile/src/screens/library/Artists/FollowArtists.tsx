import React, { useLayoutEffect, useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import { View, FlatList, Keyboard } from 'react-native';

import { useSelector } from 'react-redux';
import { selectFilteredArtists } from '@serenity/core';
import { Screen } from '@serenity/components';
import { ArtistList } from './components/ArtistList';

export interface Props {
}

export const FollowArtists = ({ navigation }: Props) => {
    const [query, setQuery] = useState('');
    const artists = useSelector((state: any) => selectFilteredArtists(state, query));

    const handleChange = (text: string) => {
        setQuery(text);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <Searchbar
                    style={{ borderRadius: 0 }}
                    placeholder="Artists, songs or podcasts"
                    onChangeText={handleChange}
                    icon={navigation.goBack ? 'arrow-back-outline' : 'search-outline'}
                    onIconPress={() => (navigation.goBack ? navigation.goBack() : Keyboard.dismiss())}
                    clearIcon={query ? "close-outline" : "mic-outline"}
                    autoFocus
                />
            )
        })
    }, [navigation])


    return (
        <Screen>
            <FlatList
                data={artists}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View style={{ margin: 16 }}>
                        <Text>No Artists found in Local library</Text>
                    </View>
                )}
                renderItem={({ item }: { item: number }) => (
                    <ArtistList
                        id={item}
                    />
                )}
            />
        </Screen>
    );
};
