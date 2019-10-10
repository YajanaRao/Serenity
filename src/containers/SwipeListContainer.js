import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SwipeList from '../components/SwipeList';
import {addToQueue, addToFavorite} from '../actions/playerState';

class SwipeListContainer extends React.Component {
  render() {
    return (
      <SwipeList
        data={this.props.data}
        addToFavorite={this.props.addToFavorite}
        addToQueue={this.props.addToQueue}
        refreshing={false}
        fetchData={this.fetchData}
      />
    );
  }
}

SwipeListContainer.propTypes = {
  data: PropTypes.object.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  addToQueue: PropTypes.func.isRequired
}

export default connect(
  null,
  {addToQueue, addToFavorite},
)(SwipeListContainer);
