import React from 'react';
import { EntityId, queueSelectors, useAppSelector } from '@serenity/core';
import { Track } from 'components/Track';

export interface TrackItemProps {
    id: EntityId;
}

export function TrackItem({ id }: TrackItemProps) {
    const track = useAppSelector(state => queueSelectors.selectById(state, id));

    return (
        <Track track={track} />
    );
}
