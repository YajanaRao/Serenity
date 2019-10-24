import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';

class Filter extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      params: { genre },
    } = navigation.state;
    return {
      headerTitle: genre.title,
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
    // const { navigation } = this.props;
    // const { params } = navigation.state;
    // const collection = params.artist || params.album;
    // if (params.artist) {
    //   findArtistSongs(collection.artist);
    // } else if (params.album) {
    //   findAlbumSongs(collection.album);
    // }
  };

  render() {
    const { navigation } = this.props;
    const { files } = this.state;

    const {
      params: { genre },
    } = navigation.state;

    return (
      <Screen>
        <View style={styles.scrollViewContent}>
          <SongListContainer
            data={files}
            fetchData={this.fetchData}
            title={genre.title}
            cover={genre.image}
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
};

export default connect(
  mapStateToProps,
  { addToQueue },
)(Filter);

const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 10,
  },
});
