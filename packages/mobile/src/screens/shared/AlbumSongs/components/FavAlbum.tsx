import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedAlbumById, toggleAlbumLike } from '@serenity/core';
import { Fav } from '../../../../components/Fav';

export interface FavAlbumProps {
    id: string
}

export function FavAlbum({ id }: FavAlbumProps) {
    const liked = useSelector(state => selectLikedAlbumById(state, id));
    const dispatch = useDispatch()

    const toggleLike = () => {
        dispatch(toggleAlbumLike(id));
    };


    return (
        <Fav
            liked={liked}
            onPress={toggleLike}
        />
    )
}


