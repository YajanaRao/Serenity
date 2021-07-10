import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSongLikeById, toggleSongLike } from '@serenity/core';
import { Fav } from '../../../../components/Fav';

export interface FavSongProps {
    id: number;
}

export function FavSong({ id }: FavSongProps) {
    const liked = useSelector(state => selectSongLikeById(state, id));
    const dispatch = useDispatch()

    const toggleLike = () => {
        console.log("about to dispatch")
        dispatch(toggleSongLike(id));
    };


    return (
        <Fav
            liked={liked}
            onPress={toggleLike}
        />
    )

}
