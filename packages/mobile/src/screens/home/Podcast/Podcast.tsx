import * as React from 'react';
import { Podcasts } from '@serenity/extensions';
import { addSongsToQueue, Player, useAppDispatch } from '@serenity/core';
import { Divider, List } from 'react-native-paper';
import { ArtCover } from 'components/ArtCover/ArtCover';
import { ListSongHeader } from 'components/ListSongHeader';
import { Animated } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { RefreshIndicator } from 'components/RefreshIndicator';
import { Container, Spinner } from '@serenity/components';
import { useQuery } from 'react-query';

export interface PodcastProps {
}

export function PodcastScreen({ route }: PodcastProps) {
    const { podcast } = route.params;

    const {data, isLoading, refetch, isFetching} = useQuery(['podcast', podcast.id], () => Podcasts.getPodcast(podcast.id))

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



    function playAudio(song) {
        dispatch(Player.playSong(song));
    }

    function addSongToQueue() {
        dispatch(addSongsToQueue(data));
    }

    if (isLoading) return <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner /></Container>


    return (
        <Animated.FlatList
            onScroll={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
            data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <ListSongHeader
                    title={podcast.title}
                    description={podcast.description}
                    cover={podcast.cover}
                    addSongsToQueue={addSongToQueue}
                />
            )}
            ItemSeparatorComponent={() => <Divider />}
            showsHorizontalScrollIndicator={false}
            refreshing={isLoading}
            refreshControl={
                <RefreshIndicator
                    refreshing={isFetching}
                    onRefresh={refetch}
                />
            }
            renderItem={({ item }) => (
                <List.Item
                    title={item.title}
                    titleStyle={{ fontSize: 14 }}
                    descriptionStyle={{ fontSize: 12 }}
                    titleNumberOfLines={2}
                    onPress={() => playAudio(item)}
                    description={item.artist || item.description}
                    left={props => <ArtCover {...props} cover={item.cover} style={{ height: 80, width: 80 }} />}
                />
            )
            }
        />
    );
}
