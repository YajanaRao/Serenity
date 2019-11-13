import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SongList from '../components/SongList';
import { addToQueue, addToPlaylist } from '../actions/playerState';

class SongListContainer extends React.PureComponent {
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

SongListContainer.propTypes = {
  data: PropTypes.array,
};

export default connect(
  null,
  { addToQueue, addToPlaylist },
)(SongListContainer);
