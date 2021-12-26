import * as React from 'react';
import { addSongsToQueue, Player, useAppDispatch } from '@serenity/core';
import { Divider, List } from 'react-native-paper';
import { ListSongHeader } from 'components/ListSongHeader';
import { Animated } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

export interface BookProps {
}

export function BookScreen({ route }: BookProps) {
    const { book } = route.params;


    const options = {
        navigationOptions: {
            headerStyle: { backgroundColor: 'transparent' },
            title: '',
        },
        config: {
            collapsedColor: 'transparent',
            useNativeDriver: true /* Optional, default: true */,
            elevation: 0,
            disableOpacity: true /* Optional, default: false */,
        },
    };
    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
    } = useCollapsibleHeader(options);

    const dispatch = useAppDispatch();



    function playAudio(track) {
        const audio = {
            id: book.id,
            title: track.title,
            artist: book.author,
            cover: book.cover,
            path: track.link,
            album: book.title
        }
        dispatch(Player.playSong(audio));
    }

    function addSongToQueue() {
        dispatch(addSongsToQueue(book.tracks));
    }



    return (
        <Animated.FlatList
            onScroll={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
            data={book.tracks}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <ListSongHeader
                    title={book.title}
                    description={book.description}
                    cover={book.cover}
                    addSongsToQueue={addSongToQueue}
                />
            )}
            ItemSeparatorComponent={() => <Divider />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <List.Item
                    title={item.title}
                    titleStyle={{ fontSize: 14 }}
                    descriptionStyle={{ fontSize: 12 }}
                    titleNumberOfLines={2}
                    onPress={() => playAudio(item)}
                    description={item.description}
                />
            )
            }
        />
    );
}
