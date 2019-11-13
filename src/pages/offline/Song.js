import * as React from 'react';
import {
  Divider,
  Button,
  Portal,
  Surface,
  List,
  IconButton,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { isEqual, isEmpty, isArray } from 'lodash';
import PropTypes from 'prop-types';
import { FlatList } from 'react-navigation';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { getOfflineSongs } from '../../actions/mediaStore';
import {
  addToQueue,
  shufflePlay,
  loadTrack,
  playNext,
} from '../../actions/playerState';
import Blank from '../../components/Blank';
import Screen from '../../components/Screen';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.bs = React.createRef();
    this.sheetOpenValue = new Animated.Value(1);
    this.state = {
      songs: [],
      refreshing: false,
      song: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.songs, state.songs) || state.refreshing) {
      return {
        songs: props.songs,
        refreshing: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { getOfflineSongs } = this.props;
    getOfflineSongs();
  }

  openBottomSheet = () => {
    this.bs.current.snapTo(0);
  };

  renderInner = () => {
    const { song } = this.state;
    const { addToQueue, loadTrack, playNext } = this.props;
    return (
      <View style={styles.panel}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={this.closeBottomSheet}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

        <Surface>
          <TouchableWithoutFeedback
            onPress={() => {
              loadTrack(song);
              this.closeBottomSheet();
            }}
          >
            <List.Item
              title="Play"
              left={props => (
                <List.Icon {...props} icon="play-circle-outline" />
              )}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              playNext(song);
              this.closeBottomSheet();
            }}
          >
            <List.Item
              title="Play next"
              left={props => <List.Icon {...props} icon="playlist-play" />}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              addToQueue(song);
              this.closeBottomSheet();
            }}
          >
            <List.Item
              title="Add to playing queue"
              left={props => <List.Icon {...props} icon="playlist-music" />}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.addToQueue}>
            <List.Item
              title="Add to Playlist"
              left={props => <List.Icon {...props} icon="playlist-plus" />}
            />
          </TouchableWithoutFeedback>
        </Surface>
      </View>
    );
  };

  fetchData = () => {
    const { getOfflineSongs } = this.props;
    this.setState({
      refreshing: true,
    });
    getOfflineSongs();
  };

  openBottomSheetForSong = song => {
    this.setState({
      song,
    });
    this.openBottomSheet();
  };

  closeBottomSheet = () => {
    this.setState({
      song: {},
    });
    this.bs.current.snapTo(1);
  };

  render() {
    const { songs, refreshing } = this.state;
    const { addToQueue, shufflePlay, loadTrack } = this.props;
    if (!isEmpty(songs) && isArray(songs)) {
      return (
        <Screen>
          <Portal>
            <Animated.View
              style={[
                {
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0, .7)',
                  ...StyleSheet.absoluteFillObject,
                },
                {
                  opacity: Animated.cond(
                    Animated.greaterOrEq(this.sheetOpenValue, 0.95),
                    0,
                    1,
                  ),
                },
              ]}
              pointerEvents="none"
            />
            <BottomSheet
              ref={this.bs}
              snapPoints={['100%', 0]}
              renderContent={this.renderInner}
              initialSnap={1}
              callbackNode={this.sheetOpenValue}
            />
          </Portal>
          <FlatList
            data={songs}
            ListHeaderComponent={() => (
              <View style={styles.container}>
                <Button
                  icon="play"
                  mode="outlined"
                  onPress={() => addToQueue(songs)}
                >
                  Play All
                </Button>
                <Button
                  icon="shuffle"
                  mode="outlined"
                  onPress={() => shufflePlay(songs)}
                >
                  Shuffle
                </Button>
              </View>
            )}
            renderItem={({ item }) => (
              <List.Item
                title={item.title}
                description={item.artist || item.album}
                right={props => (
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => this.openBottomSheetForSong(item)}
                  />
                )}
                onPress={() => loadTrack(item)}
              />
            )}
            ItemSeparatorComponent={() => <Divider inset />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.fetchData}
              />
            }
          />
        </Screen>
      );
    }
    return <Blank text="No offline songs found.." fetchData={this.fetchData} />;
  }
}

const mapStateToProps = state => ({
  songs: state.mediaStore.songs,
});

Song.propTypes = {
  // songs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  getOfflineSongs: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  shufflePlay: PropTypes.func.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { addToQueue, getOfflineSongs, shufflePlay, loadTrack, playNext },
)(Song);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // elevation: 12,
    zIndex: 1000,
  },
});
