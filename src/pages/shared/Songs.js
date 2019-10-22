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
    const item = {};
    item.cover = navigation.getParam('img');
    item.name = navigation.getParam('title');
    // header: null
    return {
      headerTitle: navigation.getParam('title'),
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

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ addToQueue: this.addSongsToQueue });
  }

  addSongsToQueue = () => {
    const { navigation, addToQueue } = this.props;
    const songs = navigation.getParam('songs');
    addToQueue(songs);
  };

  render() {
    const { navigation } = this.props;

    const songs = navigation.getParam('songs', []);
    const albumImage = navigation.getParam('img');
    const title = navigation.getParam('title', 'No Title');

    return (
      <Screen>
        <View style={styles.scrollViewContent}>
          <SongListContainer data={songs} cover={albumImage} title={title} />
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
