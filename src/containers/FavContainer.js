import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToFavourite } from '../actions/playerState';
import Fav from '../components/Fav';

class FavContainer extends PureComponent {
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
    const { style, type } = this.props;
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

FavContainer.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string.isRequired,
};

FavContainer.defaultProps = {
  type: 'song',
};

export default connect(
  null,
  { addToFavourite },
)(FavContainer);
