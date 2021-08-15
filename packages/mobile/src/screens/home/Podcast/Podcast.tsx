import * as React from 'react';
import { RefreshControl } from 'react-native';
import { Podcasts } from '@serenity/extensions';
import { addSongsToQueue, playSong, useAppDispatch } from '@serenity/core';
import { Divider, List } from 'react-native-paper';
import { ArtCover } from 'components/ArtCover/ArtCover';
import { ListSongHeader } from 'components/ListSongHeader';
import { Animated } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

export interface PodcastProps {
}

export function PodcastScreen({ route }: PodcastProps) {
    const { podcast } = route.params;

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

    const [isLoading, setIsLoading] = React.useState(true);

    function getPodcasts() {
        setIsLoading(true);
        Podcasts.getPodcast(podcast.id).then(response => {
            setEpisodes(response);
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        getPodcasts();
    }, [podcast]);

    const [episodes, setEpisodes] = React.useState([]);
    const dispatch = useAppDispatch();



    function playAudio(song) {
        dispatch(playSong(song));
    }

    function addSongToQueue() {
        dispatch(addSongsToQueue(episodes));
    }

    return (
        <Animated.FlatList
            onScroll={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
            data={episodes}
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
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={getPodcasts}
                    colors={['#12c2e9', '#c471ed', '#f64f59']}
                />
            }
            renderItem={({ item }) => (
                <List.Item
                    title={item.title}
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
