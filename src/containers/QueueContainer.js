import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';
import { Surface, Title, IconButton, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Alert } from 'react-native';

import { clearQueue, removeFromQueue } from '../actions/playerState';
import { getQueuedSongs } from '../actions/realmAction';
import TrackContainer from './TrackContainer';
import LoveContainer from './LoveContainer';
import realm from '../database';

class QueueContainer extends Component {
  state = {
    queue: []
  }
  clearPlaylist = () => {
    Alert.alert(
      'Clear Queue',
      'Clear queue would stop current playing song',
      [
        {
          text: 'Yes', onPress: () => {
            this.props.close();
            this.props.clearQueue();
          }
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

  componentDidMount() {
    this.setState({
      queue: getQueuedSongs()
    })

    realm.addListener('change', () => {
      this.setState({
        queue: getQueuedSongs()
      })
    })
  }

  componentWillUnmount() {
    realm.removeAllListeners();
  }

  render() {
    return !isEmpty(this.state.queue) ? (
      <View>
        <View style={styles.rowContainer}>
          <Title style={{ padding: 10 }}>Queue</Title>
          <IconButton
            icon="delete"
            // size={40}
            onPress={this.clearPlaylist}
          />
        </View>

        <Divider />
        <SwipeListView
          data={this.state.queue}
          renderItem={({ item }) => <TrackContainer track={item} />}
          ItemSeparatorComponent={() => <Divider inset={true} />}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={({ item }) => (
            <Surface style={styles.rowBack}>
              <IconButton
                icon="delete"
                color={'#dd1818'}
                onPress={() => this.props.removeFromQueue(item)}
              />
              <LoveContainer track={this.props.active} />
            </Surface>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
          closeOnRowPress={true}
          closeOnRowOpen={true}
          useNativeDriver={true}
        />
      </View>
    ) : (
        false
      );
  }
}



QueueContainer.propTypes = {
  queue: PropTypes.array,
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

