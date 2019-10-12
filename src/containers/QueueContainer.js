import React, {Component} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';
import {Surface, Title, IconButton, Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {clearQueue, removeFromQueue} from '../actions/playerState';
import TrackContainer from './TrackContainer';
import LoveContainer from './LoveContainer';

class QueueContainer extends Component {
  clearPlaylist = () => {
    this.props.clearQueue();
  };
  
  render() {
    return !isEmpty(this.props.queue) ? (
      <View>
        <View style={styles.rowContainer}>
          <Title style={{padding: 10}}>Queue</Title>
          <IconButton
            icon="delete"
            // size={40}
            onPress={this.clearPlaylist}
          />
        </View>

        <Divider />
        <SwipeListView
          data={this.props.queue}
          renderItem={({item}) => <TrackContainer track={item} />}
          ItemSeparatorComponent={() => <Divider inset={true} />}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={({item}) => (
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

const mapStateToProps = state => ({
  queue: state.playerState.queue,
});

QueueContainer.propTypes = {
  queue: PropTypes.array.isRequired,
  clearQueue: PropTypes.func.isRequired,
  removeFromQueue: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
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

