import React from 'react';
import { selectAlbumLikeById, albumUpdated, useAppDispatch, useAppSelector } from '@serenity/core';
import { Fav } from '../../../../components/Fav';

export interface FavAlbumProps {
    id: string
}

export function FavAlbum({ id }: FavAlbumProps) {
    const isLiked = useAppSelector(state => selectAlbumLikeById(state, id));
    const dispatch = useAppDispatch()

    const toggleLike = () => {
        dispatch(albumUpdated({ id, changes: { liked: !isLiked } }));
    };


    return (
        <Fav
            liked={isLiked}
            onPress={toggleLike}
        />
    )
}


