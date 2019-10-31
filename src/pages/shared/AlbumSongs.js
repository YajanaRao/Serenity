import React, { Component } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import { findAlbumSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';
import FavContainer from '../../containers/FavContainer';

class AlbumSongs extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const item = params.album;
    return {
      headerTitle: item.name || item.album,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FavContainer item={item} type="album" />
          <IconButton
            icon="play-circle-outline"
            onPress={navigation.getParam('addToQueue')}
          />
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.fetchData();
    navigation.setParams({ addToQueue: this.addToQueue });
  }

  addSongsToQueue = () => {
    const { addToQueue } = this.props;
    const { files } = this.state;
    addToQueue(files);
  };

  fetchData = () => {
    const { navigation } = this.props;
    const {
      params: { album },
    } = navigation.state;
    const songsPromise = findAlbumSongs(album.name);
    songsPromise.then(songs => {
      this.setState({
        files: songs,
      });
    });
  };

  render() {
    const { navigation } = this.props;
    const { files } = this.state;
    const {
      params: { album },
    } = navigation.state;

    return (
      <Screen>
        <SongListContainer
          data={files}
          fetchData={this.fetchData}
          title={album.name || album.album}
          cover={album.cover}
        />
      </Screen>
    );
  }
}

AlbumSongs.propTypes = {
  navigation: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addToQueue },
)(AlbumSongs);
