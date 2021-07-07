import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSongById, toggleSongLike } from '../../../../../../core/src';
import { Fav } from '../../../../components/Fav';

export interface FavSongProps {
    id: string;
}

export function FavSong({ id }: FavSongProps) {
    const liked = useSelector(state => selectSongById(state, id));
    const dispatch = useDispatch()

    const toggleLike = () => {
        dispatch(toggleSongLike(id));
    };


    return (
        <Fav
            liked={liked}
            onPress={toggleLike}
        />
    )

}
