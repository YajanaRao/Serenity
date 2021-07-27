import React from 'react';
import { useSelector } from 'react-redux';
import { EntityId, queueSelectors } from '@serenity/core';
import { TrackContainer } from '../../../containers/TrackContainer';

export interface TrackItemProps {
    id: EntityId;
}

export function TrackItem({ id }: TrackItemProps) {
    const track = useSelector(state => queueSelectors.selectById(state, id));

    return (
        <TrackContainer track={track} />
    );
}
