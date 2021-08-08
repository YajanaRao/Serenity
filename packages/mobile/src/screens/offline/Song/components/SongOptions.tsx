import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
    List,
    useTheme,
    Divider
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { addSongToQueue, toggleLike, Player, useAppSelector, songsSelectors, useAppDispatch } from '@serenity/core';
import { ArtCover } from 'components/ArtCover/ArtCover';
import { BottomSheet } from 'components/BottomSheet/BottomSheet';



export const SongOptions = ({ bs, id, addSongToPlaylist }) => {
    const song = useAppSelector(state => songsSelectors.selectById(state, id))

    const { colors } = useTheme();
    const dispatch = useAppDispatch();

    function play() {
        dispatch(Player.playSong(song));
        closeBottomSheet();
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
        dispatch(toggleLike(song?.id))
        closeBottomSheet();
    };

    const addToPlaylist = () => {
        closeBottomSheet();
        addSongToPlaylist();
    }

    const closeBottomSheet = () => {
        bs.current?.dismiss();
    };


    function renderInner() {
        const { liked } = song;
        return (
            <View
                style={{
                    backgroundColor: colors.surface,
                    flex: 1,
                    borderTopStartRadius: 24,
                    borderTopEndRadius: 24
                }}
            >
                <View style={styles.optionContainer}>
                    <TouchableWithoutFeedback
                        onPress={closeBottomSheet}
                    >
                        <List.Item
                            title={song.title}
                            description={song.artist || song.album}
                            left={props => (
                                <ArtCover cover={song.cover} {...props} />
                            )}
                            onPress={closeBottomSheet}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <Divider />
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
        );
    };

    if (!song) {
        return null;
    }

    return (
        <BottomSheet
            bs={bs}
        >
            {renderInner()}
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    optionContainer: { margin: 12 }
});
