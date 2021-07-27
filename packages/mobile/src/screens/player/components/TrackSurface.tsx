import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { removeSongFromQueue, queueSelectors, toggleSongLike } from '@serenity/core';
import { Fav } from 'components/Fav';
import { TrackProps } from 'utils/types';

export interface TrackSurfaceProps {
}

export function TrackSurface({ id }: TrackSurfaceProps) {
    const track = useSelector(state => queueSelectors.selectById(state, id));
    const dispatch = useDispatch();


    const removeFromQueue = (song: TrackProps) => {
        dispatch(removeSongFromQueue(song));
    };

    function toggleLike() {
        dispatch(toggleSongLike())
    }

    return (
        <Surface style={styles.rowBack}>
            <IconButton
                icon="trash-outline"
                color="#dd1818"
                onPress={() => removeFromQueue(track)}
            />
            <Fav liked={track?.liked} onPress={toggleLike} />
        </Surface>
    );
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
});