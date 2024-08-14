import React from 'react';
import { artistUpdated, EntityId, selectArtistLikeById, useAppDispatch, useAppSelector } from '@serenity/core';
import { Follow } from 'components/Follow';

export const FollowArtist = ({ id }: { id: EntityId }) => {
    const liked = useAppSelector(state => selectArtistLikeById(state, id));
    const dispatch = useAppDispatch()

    const toggleLike = () => {
        dispatch(artistUpdated({ id, changes: { liked: !liked } }));
    };


    return (
        <Follow
            liked={liked || false}
            onPress={toggleLike}
        />
    )
}