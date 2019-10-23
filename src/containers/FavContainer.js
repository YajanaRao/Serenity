import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addSongToFavorite,
  addAlbumToFavorite,
  removeAlbumFromFavorite,
} from '../actions/playerState';
import { isAlbumPresent } from '../actions/realmAction';
import Fav from '../components/Fav';

class FavContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  componentDidMount() {
    const { type, item } = this.props;
    if (type === 'album') {
      console.log(isAlbumPresent(item.id));
      if (isAlbumPresent(item.id)) {
        console.log('checking album is true');
        this.setState({
          liked: true,
        });
      }
    }
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
    const { item, type, removeAlbumFromFavorite } = this.props;
    if (type === 'album') {
      removeAlbumFromFavorite(item);
    }
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
  { addSongToFavorite, addAlbumToFavorite, removeAlbumFromFavorite },
)(FavContainer);
