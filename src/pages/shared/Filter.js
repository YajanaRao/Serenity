import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import { filterAlbumSongs, filterArtistSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';
import FavContainer from '../../containers/FavContainer';

class Filter extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const item = params.artist || params.album;
    console.log(item);
    return {
      headerTitle: item.album || item.artist,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FavContainer item={item} type={item.album ? 'album' : 'artist'} />
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
    const { params } = navigation.state;
    const collection = params.artist || params.album;

    if (params.artist) {
      filterArtistSongs(collection.artist, collection.cover);
    } else if (params.album) {
      filterAlbumSongs(collection.album, collection.cover);
    }
  };

  render() {
    const { navigation } = this.props;
    const { files } = this.state;

    const { params } = navigation.state;
    const collection = params.artist || params.album;

    return (
      <Screen>
        <View style={styles.scrollViewContent}>
          <SongListContainer
            data={files}
            fetchData={this.fetchData}
            title={collection.album || collection.artist}
            cover={collection.cover}
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
