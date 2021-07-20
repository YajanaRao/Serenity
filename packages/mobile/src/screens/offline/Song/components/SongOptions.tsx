import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
    Title,
    List,
    Portal,
    Subheading,
    useTheme,
    IconButton,
} from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import { DefaultImage } from '../../../../components/DefaultImage';
import { addSongToQueue, toggleLike, Player } from '@serenity/core';
import { useDispatch } from 'react-redux';

export const SongOptions = React.memo(({ bs, song, closeBottomSheet, playSong, addSongToPlaylist }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const sheetOpenValue = new Animated.Value(1);
    const { colors } = theme;



    const play = () => {
        closeBottomSheet();
        playSong(song);
    };


    const addSongToPlayNext = () => {
        closeBottomSheet();
        // TODO:
        // add song to play next feature
        // dispatch(skipToNext(song));
    };

    const addToQueue = () => {
        closeBottomSheet();
        dispatch(addSongToQueue(song));
    };



    const addToFav = () => {
        closeBottomSheet();
        dispatch(toggleLike(song.id))
        closeBottomSheet();
    };

    const addToPlaylist = () => {
        closeBottomSheet();
        addSongToPlaylist();
    }


    const renderInner = () => {
        if (!song) {
            return null;
        }
        const { title, artist, album, liked } = song;
        return (
            <View style={styles.panel}>
                <View
                    style={[styles.panelContainer, {
                        backgroundColor: colors.surface,
                    }]}
                >
                    <View style={styles.sheetContainer}>
                        <View
                            style={[styles.closeContainer, {
                                backgroundColor: colors.surface,
                            }]}
                        >
                            <TouchableWithoutFeedback onPress={closeBottomSheet}>
                                <IconButton icon="close" />
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={closeBottomSheet}
                            style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: Dimensions.get('window').width,
                            }}
                        >
                            <DefaultImage style={styles.artCover} />
                            <Title>{title}</Title>
                            <Subheading>{`by ${artist || album}`}</Subheading>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ backgroundColor: colors.surface }}>
                        <View>
                            <TouchableWithoutFeedback onPress={play}>
                                <List.Item
                                    title="Play Now"
                                    left={props => (
                                        <List.Icon {...props} icon="play-circle-outline" />
                                    )}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={addSongToPlayNext}>
                                <List.Item
                                    title="Play next"
                                    left={props => (
                                        <List.Icon {...props} icon="playlist-play" />
                                    )}
                                />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={addToQueue}>
                                <List.Item
                                    title="Add to Queue"
                                    left={props => (
                                        <List.Icon {...props} icon="playlist-play" />
                                    )}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={addToFav}>
                                <List.Item
                                    title={liked ? "Reomve from Favorites" : "Add to Favorites"}
                                    left={props => (
                                        <List.Icon {...props} icon={liked ? "heart" : "heart-outline"} />
                                    )}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={addToPlaylist}>
                                <List.Item
                                    title="Add to Playlist"
                                    left={props => (
                                        <List.Icon {...props} icon="playlist-plus" />
                                    )}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View>
            <Portal>
                <Animated.View
                    style={[
                        {
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0, .7)',
                            ...StyleSheet.absoluteFillObject,
                        },
                        {
                            opacity: Animated.cond(
                                Animated.greaterOrEq(sheetOpenValue, 0.95),
                                0,
                                1,
                            ),
                        },
                    ]}
                    pointerEvents="none"
                />
                <BottomSheet
                    ref={bs}
                    snapPoints={['100%', 0]}
                    renderContent={renderInner}
                    initialSnap={1}
                    callbackNode={sheetOpenValue}
                />
            </Portal>
        </View>
    );
});

const styles = StyleSheet.create({
    artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
    panel: {
        height: '100%',
        justifyContent: 'flex-end',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 1000,
    },
    panelContainer: {
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    },
    sheetContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    },
    closeContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        height: 50,
        marginBottom: 16,
        elevation: 2,
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
    }
});
