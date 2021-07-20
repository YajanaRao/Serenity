import React from 'react';
import { artistUpdated, selectArtistLikeById, useAppDispatch, useAppSelector } from '@serenity/core';
import { Follow } from '../../../../components/Follow';

export const FollowArtist = ({ id }: { id: string }) => {
    const liked = useAppSelector(state => selectArtistLikeById(state, id));
    const dispatch = useAppDispatch()

    const toggleLike = () => {
        dispatch(artistUpdated({ id, changes: { liked: !liked } }));
    };


    return (
        <Follow
            liked={liked}
            onPress={toggleLike}
        />
    )
}