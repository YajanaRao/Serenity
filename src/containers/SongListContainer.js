import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeList from '../components/SwipeList';
import { addToQueue, addToPlaylist } from '../actions/playerState';

class SwipeListContainer extends React.PureComponent {
  render() {
    const { fetchData, data, title, cover } = this.props;
    return (
      <SwipeList
        data={data}
        title={title}
        cover={cover}
        fetchData={fetchData}
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
