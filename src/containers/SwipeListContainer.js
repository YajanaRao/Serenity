import React from 'react';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';

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

export default connect(
  null,
  {addToQueue, addToFavorite},
)(SwipeListContainer);
