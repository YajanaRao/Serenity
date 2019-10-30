import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeList from '../components/SwipeList';
import { addToQueue, addToPlaylist } from '../actions/playerState';

class SwipeListContainer extends React.PureComponent {
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
      <SwipeList
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

SwipeListContainer.propTypes = {
  data: PropTypes.array,
};

export default connect(
  null,
  { addToQueue, addToPlaylist },
)(SwipeListContainer);
