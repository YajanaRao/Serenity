import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';
import { Surface, Title, IconButton, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Alert } from 'react-native';
import values from 'lodash/values';

import { clearQueue, removeFromQueue } from '../actions/playerState';
import { getQueuedSongs } from '../actions/realmAction';
import TrackContainer from './TrackContainer';
import FavContainer from './FavContainer';

class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.realmSongs = getQueuedSongs();
    const queue = values(this.realmSongs);
    this.state = {
      queue,
    };
  }

  componentDidMount() {
    const { queue } = this.state;
    if (queue.length) {
      this.realmSongs.addListener((songs, changes) => {
        if (
          changes.insertions.length > 0 ||
          changes.modifications.length > 0 ||
          changes.deletions.length > 0
        ) {
          const song = values(songs);
          this.setState({
            queue: song,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    const { queue } = this.state;
    if (queue.length) {
      this.realmSongs.removeAllListeners();
    }
  }

  clearPlaylist = () => {
    const { close, clearQueue } = this.props;
    Alert.alert(
      'Clear Queue',
      'Clear queue would stop current playing song',
      [
        {
          text: 'Yes',
          onPress: () => {
            close();
            clearQueue();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { queue } = this.state;
    const { active, removeFromQueue } = this.props;
    return !isEmpty(queue) ? (
      <SwipeListView
        data={queue}
        ListHeaderComponent={() => (
          <View style={styles.rowContainer}>
            <Title style={{ padding: 10 }}>Queue</Title>
            <IconButton
              icon="delete"
              // size={40}
              onPress={this.clearPlaylist}
            />
          </View>
        )}
        renderItem={({ item }) => <TrackContainer track={item} />}
        ItemSeparatorComponent={() => <Divider inset />}
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={({ item }) => (
          <Surface style={styles.rowBack}>
            <IconButton
              icon="delete"
              color="#dd1818"
              onPress={() => removeFromQueue(item)}
            />
            <FavContainer track={active} type="song" />
          </Surface>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        closeOnRowPress
        closeOnRowOpen
        useNativeDriver
      />
    ) : (
      false
    );
  }
}

QueueContainer.propTypes = {
  clearQueue: PropTypes.func.isRequired,
  removeFromQueue: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    clearQueue,
    removeFromQueue,
  },
)(QueueContainer);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
