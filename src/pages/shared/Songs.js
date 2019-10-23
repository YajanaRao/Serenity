import React, { Component } from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToQueue } from '../../actions/playerState';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';
import FavContainer from '../../containers/FavContainer';

class Songs extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const item = params.artist || params.album;
    // header: null
    return {
      headerTitle: item.album || item.artist,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <FavContainer item={item} type={params.album ? 'album' : 'artist'} />
          <IconButton
            icon="play-circle-outline"
            onPress={navigation.getParam('addToQueue')}
          />
        </View>
      ),
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ addToQueue: this.addSongsToQueue });
  }

  addSongsToQueue = () => {
    const { navigation, addToQueue } = this.props;
    const { params } = navigation.state;
    const collection = params.album;
    addToQueue(collection.songs);
  };

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const collection = params.artist || params.album;

    return (
      <Screen>
        <View style={styles.scrollViewContent}>
          <SongListContainer
            data={collection.songs}
            cover={collection.artwork}
            title={collection.album}
          />
          <View style={{ height: 100 }} />
        </View>
      </Screen>
    );
  }
}

Songs.propTypes = {
  navigation: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addToQueue },
)(Songs);

const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 10,
  },
});
