import * as React from 'react';
import { RefreshControl } from 'react-native';
import { Songs } from '@serenity/extensions';
import { addSongsToQueue, playSong, useAppDispatch } from '@serenity/core';
import { List, useTheme } from 'react-native-paper';
import { ArtCover } from 'components/ArtCover/ArtCover';
import { Animated } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { ListHeader } from './ListHeader';
import { RefreshIndicator } from 'components/RefreshIndicator';

export interface PlaylistProps {
}

export function PlaylistScreen({ route }: PlaylistProps) {
    const { playlist } = route.params;

    const options = {
        navigationOptions: {
            headerStyle: { backgroundColor: 'transparent' },
            title: '',
        },
        config: {
            collapsedColor: 'transparent',
            useNativeDriver: true,
            elevation: 0,
            disableOpacity: true,
        },
    };

    const [songs, setSongs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useAppDispatch();


    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
    } = useCollapsibleHeader(options);



    function getSongs() {
        setIsLoading(true);
        Songs.getSongs(playlist).then(response => {
            setSongs(response);
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        getSongs();
    }, [playlist]);

    async function playAudio(song) {
        const url = await Songs.playSong(song.path);
        const track = {
            ...song,
            path: url,
        }
        dispatch(playSong(track));
    }

    function addSongToQueue() {
        dispatch(addSongsToQueue(songs));
    }

    return (
        <Animated.FlatList
            onScroll={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
            data={songs}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <ListHeader
                    title={playlist.title}
                    description={playlist.description}
                    cover={playlist.cover}
                    onPress={addSongToQueue}
                />
            )}
            showsHorizontalScrollIndicator={false}
            refreshing={isLoading}
            refreshControl={
                <RefreshIndicator
                    refreshing={isLoading}
                    onRefresh={getSongs}
                />
            }
            renderItem={({ item }) => (
                <List.Item
                    title={item.title}
                    titleNumberOfLines={2}
                    onPress={() => playAudio(item)}
                    description={`${item.description}`}
                    left={props => <ArtCover {...props} cover={item.cover} style={{ height: 48, width: 84 }} />}
                />
            )}
        />
    );



}
// 168 / 2