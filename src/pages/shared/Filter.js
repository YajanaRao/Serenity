import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import { filterAlbumSongs, filterArtistSongs } from '../../actions/mediaStore';
import SwipeListContainer from '../../containers/SwipeListContainer';
import Screen from '../../components/Screen';

class Filter extends Component {
  static navigationOptions = ({ navigation }) => {
    // header: null
    return {
      headerTitle: navigation.getParam('title'),
      headerRight: (
        <IconButton
          icon="play-circle-outline"
          onPress={navigation.getParam('addToQueue')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.files, state.files) || state.refreshing) {
      return {
        files: props.files,
      };
    }
    return null;
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
    const { navigation, filterAlbumSongs, filterArtistSongs } = this.props;

    const album = navigation.getParam('album', null);
    const artist = navigation.getParam('artist', null);
    const image = navigation.getParam('img');

    if (artist) {
      filterArtistSongs(artist, image);
    } else if (album) {
      filterAlbumSongs(album, image);
    }
  };

  render() {
    const { navigation } = this.props;
    const { files } = this.state;

    const albumImage = navigation.getParam('img');
    const title = navigation.getParam('title', 'No Title');

    return (
      <Screen>
        <View style={styles.scrollViewContent}>
          <SwipeListContainer
            data={files}
            fetchData={this.fetchData}
            title={title}
            cover={albumImage}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  files: state.mediaStore.files,
});

Filter.propTypes = {
  navigation: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
  filterArtistSongs: PropTypes.func.isRequired,
  filterAlbumSongs: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { addToQueue, filterAlbumSongs, filterArtistSongs },
)(Filter);

const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 10,
  },
  artCover: { width: 200, height: 200, borderRadius: 12, elevation: 4 },
});
