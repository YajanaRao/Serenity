import React, { Component } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import { findArtistSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';
import FavContainer from '../../containers/FavContainer';

class ArtistSongs extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      params: { artist },
    } = navigation.state;
    return {
      headerTitle: artist.name || artist.artist,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FavContainer item={artist} type="artist" />
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
      params: { artist },
    } = navigation.state;
    const songsPromise = findArtistSongs(artist.name || artist.artist);
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
      params: { artist },
    } = navigation.state;

    return (
      <Screen>
        <SongListContainer
          data={files}
          fetchData={this.fetchData}
          title={artist.name || artist.artist}
          cover={artist.cover}
        />
      </Screen>
    );
  }
}

ArtistSongs.propTypes = {
  navigation: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addToQueue },
)(ArtistSongs);
