import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addSongToFavorite,
  addAlbumToFavorite,
  removeAlbumFromFavorite,
} from '../actions/playerState';
import {
  isAlbumPresent,
  isArtistPresent,
  isSongPresent,
  addArtist,
  removeArtist,
} from '../actions/realmAction';
import Fav from '../components/Fav';
import Follow from '../components/Follow';

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
      if (isAlbumPresent(item.id)) {
        this.setState({
          liked: true,
        });
      }
    } else if (type === 'artist') {
      if (isArtistPresent(item.id)) {
        this.setState({
          liked: true,
        });
      }
    } else if (isSongPresent(item.id)) {
      this.setState({
        liked: true,
      });
    }
  }

  addArtistToFavorite = () => {
    const { item } = this.props;
    addArtist(item);
    this.setState({
      liked: true,
    });
  };

  removeArtistFromFav = () => {
    const { item } = this.props;
    removeArtist(item.id);
    this.setState({
      liked: false,
    });
  };

  addToFavorite = () => {
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
    const { style, type } = this.props;
    if (type === 'artist') {
      return (
        <Follow
          liked={liked}
          style={style}
          addToFavorite={this.addArtistToFavorite}
          removeFromFavorite={this.removeArtistFromFav}
        />
      );
    }
    return (
      <Fav
        liked={liked}
        style={style}
        addToFavorite={this.addToFavorite}
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
  {
    addSongToFavorite,
    addAlbumToFavorite,
    removeAlbumFromFavorite,
  },
)(FavContainer);
