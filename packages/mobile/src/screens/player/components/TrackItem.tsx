import React from 'react';
import { EntityId, queueSelectors, useAppSelector } from '@serenity/core';
import { TrackContainer } from 'containers/TrackContainer';

export interface TrackItemProps {
    id: EntityId;
}

export function TrackItem({ id }: TrackItemProps) {
    const track = useAppSelector(state => queueSelectors.selectById(state, id));

    return (
        <TrackContainer track={track} />
    );
}
