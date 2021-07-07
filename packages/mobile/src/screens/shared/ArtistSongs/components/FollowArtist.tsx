import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedAlbumById, toggleArtistLike } from '@serenity/core';
import { Follow } from '../../../../components/Follow';

export const FollowArtist = ({ id }: { id: string }) => {
    const liked = useSelector(state => selectLikedAlbumById(state, id));
    const dispatch = useDispatch()

    const toggleLike = () => {
        dispatch(toggleArtistLike(id));
    };


    return (
        <Follow
            liked={liked}
            onPress={toggleLike}
        />
    )
}