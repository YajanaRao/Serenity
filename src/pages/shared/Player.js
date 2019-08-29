import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import {
  Subheading,
  FAB,
  withTheme,
  IconButton,
  Title,
  Divider,
  Surface,
  ActivityIndicator
} from "react-native-paper";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import { SwipeListView } from "react-native-swipe-list-view";

import TrackContainer from '../../containers/TrackContainer';
import Love from "../../components/Love";
// import ProgressBar from '../../components/ProgressBar';

import {
  playTrack,
  clearQueue,
  skipToNext,
  skipToPrevious,
  pauseTrack,
  removeFromQueue,
  getQueue,
  getTrackStatus
} from "../../actions/playerState";

class Player extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  togglePlayback = () => {
    if (this.props.status == "playing") {
      this.props.pauseTrack();
    } else {
      this.props.playTrack();
    }
  };

  clearPlaylist = () => {
    this.props.clearQueue();
    this.props.navigation.goBack();
  };

  render() {
    const { colors } = this.props.theme;

    if (!isUndefined(this.props.active)) {
      return (
        <View style={{backgroundColor: colors.background, flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <IconButton
                icon="close"
                onPress={() => this.props.navigation.goBack()}
              />
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
                <FastImage
                  source={require('../../assets/note.png')}
                  style={styles.artCover}
                />
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
            {/* <View style={{ alignItems: 'center', justifyContent: 'center', margin: 16 }}>
                        <ProgressBar />
                    </View> */}
            <View style={styles.playerToolbox}>
              <Love style={{width: 60}} track={this.props.active} />
              <IconButton
                icon="skip-previous"
                size={40}
                onPress={this.props.skipToPrevious}
              />
              <FAB
                icon={this.props.status === 'playing' ? 'pause' : 'play-arrow'}
                onPress={() => this.togglePlayback()}
              />
              <IconButton
                icon="skip-next"
                size={40}
                onPress={this.props.skipToNext}
              />
              <IconButton
                icon="repeat"
                // size={20}
                onPress={() => console.log('pressed')}
              />
            </View>
            {/* <View style={styles.rowContainer}>
              <Lyric style={{ width: 60 }} track={this.props.active} />
            </View> */}
            <Divider />

            {!isEmpty(this.props.queue) ? (
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
                        color={colors.error}
                        onPress={() => this.props.removeFromQueue(item)}
                      />
                      <Love track={this.props.active} />
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
            )}

            <View style={{height: 100}} />
          </ScrollView>
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}

const mapStateToProps = state => ({
  queue: state.playerState.queue,
  active: state.playerState.active,
  status: state.playerState.status
});

export default connect(
  mapStateToProps,
  {
    playTrack,
    pauseTrack,
    clearQueue,
    skipToNext,
    skipToPrevious,
    removeFromQueue,
    getQueue,
    getTrackStatus
  }
)(withTheme(Player));

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  artCover: { width: 250, height: 250, borderRadius: 4 },
  rowBack: {
    alignItems: "center",
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15
  },
  playerToolbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 12
  }
});
