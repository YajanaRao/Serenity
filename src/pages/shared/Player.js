import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Subheading,
  FAB,
  withTheme,
  IconButton,
  Title,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import QueueContainer from '../../containers/QueueContainer';
import LoveContainer from '../../containers/LoveContainer';
import ProgressBar from '../../components/ProgressBar';

import {
  playTrack,
  skipToNext,
  skipToPrevious,
  pauseTrack,
  repeatSongs,
} from '../../actions/playerState';
import DefaultImage from '../../components/DefaultImage';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  togglePlayback = () => {
    if (this.props.status == 'playing') {
      this.props.pauseTrack();
    } else {
      this.props.playTrack();
    }
  };

  updateRepeatType = () => {
    console.log(this.props.repeat);
    if (this.props.repeat == 'repeat-all') {
      this.props.repeatSongs('repeat-one');
    } else {
      this.props.repeatSongs('repeat-all');
    }
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {colors} = this.props.theme;

    if (!isUndefined(this.props.active)) {
      return (
        <View style={{backgroundColor: colors.background, flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <IconButton icon="close" onPress={this.close} />
              {/* <IconButton
                            icon="more-vert"
                            onPress={() => this.props.navigation.goBack()}
                        /> */}
            </View>
            <View style={styles.centerContainer}>
              {isString(this.props.active.artwork) ? (
                <FastImage
                  source={{uri: this.props.active.artwork}}
                  style={[styles.artCover, {backgroundColor: colors.surface}]}
                />
              ) : (
                <DefaultImage style={styles.artCover} />
              )}
            </View>
            <View style={styles.centerContainer}>
              <Title numberOfLines={1}>{this.props.active.title}</Title>
              <Subheading numberOfLines={1}>
                {this.props.active.artist
                  ? this.props.active.artist
                  : this.props.active.album}
              </Subheading>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16,
              }}>
              <ProgressBar status={this.props.status} />
            </View>
            <View style={styles.playerToolbox}>
              <LoveContainer style={{width: 60}} track={this.props.active} />
              <IconButton
                icon="skip-previous"
                size={40}
                onPress={this.props.skipToPrevious}
              />
              <FAB
                icon={this.props.status === 'playing' ? 'pause' : 'play-arrow'}
                onPress={this.togglePlayback}
              />
              <IconButton
                icon="skip-next"
                size={40}
                onPress={this.props.skipToNext}
              />
              {this.props.repeat == 'repeat-all' ? (
                <IconButton
                  icon="repeat"
                  // size={20}
                  onPress={this.updateRepeatType}
                />
              ) : (
                <IconButton
                  icon="repeat-one"
                  // size={20}
                  onPress={this.updateRepeatType}
                />
              )}
            </View>
            {/* <View style={styles.rowContainer}>
              <Lyric style={{ width: 60 }} track={this.props.active} />
            </View> */}
            <Divider />

            <QueueContainer />
            <View style={{height: 100}} />
          </ScrollView>
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}

Player.propTypes = {
  status: PropTypes.string.isRequired,
  active: PropTypes.object.isRequired,
  repeat: PropTypes.string.isRequired,
  pauseTrack: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired,
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
    playTrack,
    pauseTrack,
    skipToNext,
    skipToPrevious,
    repeatSongs
  },
)(withTheme(Player));

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
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  artCover: {width: 250, height: 250, borderRadius: 4},
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
