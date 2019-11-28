import React from 'react';
import { connect } from 'react-redux';
import SongList from '../components/SongList';
import { addToQueue, addToPlaylist } from '../actions/playerState';

interface TrackProps {
  artwork: string;
  title: string;
  artist: string;
}

interface SongListContainerProps {
  data: TrackProps[];
  title: string;
  cover: string;
  addToPlaylist(): void;
  addToQueue(): void;
  fetchData(): void;
}

class SongListContainer extends React.PureComponent<SongListContainerProps> {
  render() {
    const {
      data,
      title,
      cover,
      addToPlaylist,
      addToQueue,
      fetchData,
    } = this.props;
    return (
      <SongList
        data={data}
        title={title}
        cover={cover}
        fetchData={fetchData}
        addToPlaylist={addToPlaylist}
        addToQueue={addToQueue}
      />
    );
  }
}

export default connect(
  null,
  { addToQueue, addToPlaylist },
)(SongListContainer);
