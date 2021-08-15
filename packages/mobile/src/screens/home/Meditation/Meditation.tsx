import * as React from 'react';
import { RefreshControl } from 'react-native';
import { Meditations } from '@serenity/extensions';
import { addSongsToQueue, playSong, useAppDispatch } from '@serenity/core';
import { List } from 'react-native-paper';
import { ArtCover } from 'components/ArtCover/ArtCover';
import { Animated } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { ListHeader } from './ListHeader';

export interface MeditationProps {
}

export function MeditationScreen({ route }: MeditationProps) {
    const { meditation } = route.params;

    const options = {
        navigationOptions: {
            headerStyle: { backgroundColor: 'transparent' } /* Optional */,
            title: '',
        },
        config: {
            collapsedColor: 'transparent' /* Optional */,
            useNativeDriver: true /* Optional, default: true */,
            elevation: 0 /* Optional */,
            disableOpacity: true /* Optional, default: false */,
        },
    };
    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
    } = useCollapsibleHeader(options);

    const [isLoading, setIsLoading] = React.useState(true);


    function getMeditations() {
        setIsLoading(true);
        Meditations.getMeditation(meditation.id).then(response => {
            setEpisodes(response);
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        getMeditations();
    }, [meditation]);

    const [episodes, setEpisodes] = React.useState([]);
    const dispatch = useAppDispatch();



    async function playAudio(song) {
        const url = await Meditations.playMeditation(song.path);
        const track = {
            ...song,
            path: url,
        }
        dispatch(playSong(track));
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
                <ListHeader
                    title={meditation.title}
                    description={meditation.description}
                    cover={meditation.cover}
                    addSongsToQueue={addSongToQueue}
                />
            )}
            showsHorizontalScrollIndicator={false}
            refreshing={isLoading}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={getMeditations}
                    colors={['#12c2e9', '#c471ed', '#f64f59']}
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