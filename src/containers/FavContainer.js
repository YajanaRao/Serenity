import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addSongToFavorite, addAlbumToFavorite } from '../actions/playerState';
import Fav from '../components/Fav';

class FavContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  addToFavourite = () => {
    const { item, type, addSongToFavorite, addAlbumToFavorite } = this.props;
    if (type === 'song') {
      addSongToFavorite(item);
    } else if (type === 'album') {
      addAlbumToFavorite(item);
    }

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
        addToFavorite={this.addToFavourite}
        removeFromFavorite={this.removeFromFavorite}
      />
    );
  }
}

FavContainer.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string,
};

FavContainer.defaultProps = {
  type: 'song',
};

export default connect(
  null,
  { addSongToFavorite, addAlbumToFavorite },
)(FavContainer);
