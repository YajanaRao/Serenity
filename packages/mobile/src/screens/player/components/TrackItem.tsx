import React from 'react';
import { useSelector } from 'react-redux';
import { selectSongById } from '../../../../../core/src';
import { TrackContainer } from '../../../containers/TrackContainer';

export interface TrackItemProps {
    id: string;
}

export function TrackItem({ id }: TrackItemProps) {
    const track = useSelector(state => selectSongById(state, id));

    return (
        <TrackContainer track={track} />
    );
}
