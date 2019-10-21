import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToFavourite } from '../actions/playerState';

class LoveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  addToFavourite = () => {
    const { item, type } = this.props;
    this.props.addToFavourite(item);
    this.setState({
      liked: true,
    });
  };

  removeFromFavorite = () => {
    this.setState({
      liked: false,
    });
  };

  render() {
    const { liked } = this.state;
    const { style } = this.props;
    return (
      <Fav
        liked={liked}
        style={style}
        addToFavourite={this.addToFavourite}
        removeFromFavorite={this.removeFromFavorite}
      />
    );
  }
}

LoveContainer.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default connect(
  null,
  { addToFavourite },
)(LoveContainer);
