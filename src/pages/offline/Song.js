import * as React from 'react';
import { Divider, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { isEqual, isEmpty, isArray } from 'lodash';
import PropTypes from 'prop-types';
import { FlatList } from 'react-navigation';
import { getOfflineSongs } from '../../actions/mediaStore';
import { addToQueue, shufflePlay } from '../../actions/playerState';
import TrackContainer from '../../containers/TrackContainer';
import Blank from '../../components/Blank';
import Screen from '../../components/Screen';

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

  componentDidMount() {
    const { getOfflineSongs } = this.props;
    getOfflineSongs();
  }

  fetchData = () => {
    const { getOfflineSongs } = this.props;
    this.setState({
      refreshing: true,
    });
    getOfflineSongs();
  };

  render() {
    const { songs, refreshing } = this.state;
    const { addToQueue, shufflePlay } = this.props;
    if (!isEmpty(songs) && isArray(songs)) {
      return (
        <Screen>
          <FlatList
            data={songs}
            ListHeaderComponent={() => (
              <View style={styles.container}>
                <Button
                  icon="play-arrow"
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
            renderItem={({ item }) => <TrackContainer track={item} />}
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
  songs: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  getOfflineSongs: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  shufflePlay: PropTypes.func.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { addToQueue, getOfflineSongs, shufflePlay },
)(Song);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
});
