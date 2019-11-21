import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Subheading,
  FAB,
  IconButton,
  Title,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import QueueContainer from '../../containers/QueueContainer';
import FavContainer from '../../containers/FavContainer';
import ProgressBar from '../../components/ProgressBar';
import Screen from '../../components/Screen';

import {
  playTrack,
  skipToNext,
  skipToPrevious,
  pauseTrack,
  repeatSongs,
} from '../../actions/playerState';
import DefaultImage from '../../components/DefaultImage';

class Player extends React.Component {
  togglePlayback = () => {
    const { status } = this.props;
    if (status === 'playing') {
      requestAnimationFrame(() => {
        pauseTrack();
      });
    } else {
      requestAnimationFrame(() => {
        playTrack();
      });
    }
  };

  updateRepeatType = () => {
    const { repeatSongs, repeat } = this.props;
    if (repeat === 'repeat-all') {
      repeatSongs('repeat-one');
    } else {
      repeatSongs('repeat-all');
    }
  };

  close = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { active, status, repeat, skipToPrevious, skipToNext } = this.props;

    if (!isUndefined(active)) {
      return (
        <Screen>
          <ScrollView>
            <View style={styles.container}>
              <IconButton icon="close" onPress={this.close} />
              {/* <IconButton
                            icon="more-vert"
                            onPress={() => this.props.navigation.goBack()}
                        /> */}
            </View>
            <View style={styles.centerContainer}>
              {isString(active.artwork) ? (
                <FastImage
                  source={{ uri: active.artwork }}
                  style={[styles.artCover]}
                />
              ) : (
                <DefaultImage style={styles.artCover} />
              )}
            </View>
            <View style={styles.centerContainer}>
              <Title numberOfLines={1}>{active.title}</Title>
              <Subheading numberOfLines={1}>
                {active.artist ? active.artist : active.album}
              </Subheading>
            </View>
            <View style={styles.centerContainer}>
              <ProgressBar />
            </View>
            <View style={styles.playerToolbox}>
              <FavContainer type="song" item={active} />
              <IconButton
                icon="skip-previous"
                size={40}
                onPress={skipToPrevious}
              />
              <FAB
                icon={status === 'playing' ? 'pause' : 'play'}
                onPress={this.togglePlayback}
                loading={status === 'loading'}
              />
              <IconButton icon="skip-next" size={40} onPress={skipToNext} />
              {repeat === 'repeat-all' ? (
                <IconButton
                  icon="repeat"
                  // size={20}
                  onPress={this.updateRepeatType}
                />
              ) : (
                <IconButton
                  icon="repeat-once"
                  // size={20}
                  onPress={this.updateRepeatType}
                />
              )}
            </View>
            {/* <View style={styles.rowContainer}>
              <Lyric style={{ width: 60 }} track={this.props.active} />
            </View> */}
            <Divider />

            <QueueContainer close={this.close} />
            <View style={{ height: 100 }} />
          </ScrollView>
        </Screen>
      );
    }
    return <ActivityIndicator />;
  }
}

Player.propTypes = {
  status: PropTypes.string.isRequired,
  active: PropTypes.shape({
    artwork: PropTypes.string,
    title: PropTypes.string.isRequired,
    album: PropTypes.string,
    artist: PropTypes.string,
  }).isRequired,
  repeat: PropTypes.string.isRequired,
  skipToNext: PropTypes.func.isRequired,
  skipToPrevious: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  active: state.playerState.active,
  status: state.playerState.status,
  repeat: state.config.repeat,
});

export default connect(
  mapStateToProps,
  {
    skipToNext,
    skipToPrevious,
    repeatSongs,
  },
)(Player);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  artCover: { width: 250, height: 250, borderRadius: 12, elevation: 4 },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 12,
  },
});
