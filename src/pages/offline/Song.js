import * as React from 'react';
import {
  withTheme,
  Divider,
  Button,
  Surface,
  IconButton,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {View, RefreshControl, StyleSheet, ScrollView} from 'react-native';
import {isEqual, isEmpty, isArray} from 'lodash';
import {SwipeListView} from 'react-native-swipe-list-view';

import {getOfflineSongs} from '../../actions/mediaStore';
import {addToQueue} from '../../actions/playerState';
import TrackContainer from '../../containers/TrackContainer';
import Blank from '../../components/Blank';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      refreshing: false,
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

  fetchData = () => {
    this.setState({
      refreshing: true,
    });
    this.props.getOfflineSongs();
  };

  componentDidMount() {
    this.props.getOfflineSongs();
  }

  render() {
    const {colors} = this.props.theme;

    if (!isEmpty(this.state.songs) && isArray(this.state.songs)) {
      return (
        <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 10,
              flexDirection: 'row',
            }}>
            <Button
              icon="play-arrow"
              mode="outlined"
              onPress={() => this.props.addToQueue(this.state.songs)}>
              Play All
            </Button>
            <Button
              icon="play-circle-outline"
              mode="outlined"
              onPress={() => this.props.addToQueue(this.state.songs)}>
              Shuffle
            </Button>
          </View>
          <Divider />
          <SwipeListView
            data={this.state.songs}
            renderItem={({item}) => <TrackContainer track={item} />}
            ItemSeparatorComponent={() => <Divider inset={true} />}
            keyExtractor={(item, index) => index.toString()}
            renderHiddenItem={({item}) => (
              <Surface style={styles.rowBack}>
                <IconButton
                  icon="add-to-queue"
                  onPress={() => this.props.addToQueue(item)}
                />
                <IconButton
                  icon="favorite"
                  onPress={() => this.props.addToFavorite(item)}
                />
              </Surface>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.fetchData()}
              />
            }
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </ScrollView>
      );
    }
    return (
      <Blank text={'No offline songs found..'} fetchData={this.fetchData} />
    );
  }
}

const mapStateToProps = state => ({
  songs: state.mediaStore.songs,
});

export default connect(
  mapStateToProps,
  {addToQueue, getOfflineSongs},
)(withTheme(Song));

const styles = StyleSheet.create({
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
