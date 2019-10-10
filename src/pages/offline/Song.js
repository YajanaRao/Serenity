import * as React from 'react';
import {
  withTheme,
  Divider,
  Button
} from 'react-native-paper';
import {connect} from 'react-redux';
import {View, RefreshControl, StyleSheet, ScrollView} from 'react-native';
import {isEqual, isEmpty, isArray} from 'lodash';
import PropTypes from 'prop-types';
import {getOfflineSongs} from '../../actions/mediaStore';
import {addToQueue, shufflePlay} from '../../actions/playerState';
import TrackContainer from '../../containers/TrackContainer';
import Blank from '../../components/Blank';
import { FlatList } from 'react-native-gesture-handler';

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
            style={styles.container}>
            <Button
              icon="play-arrow"
              mode="outlined"
              onPress={() => this.props.addToQueue(this.state.songs)}>
              Play All
            </Button>
            <Button
              icon="shuffle"
              mode="outlined"
              onPress={() => this.props.shufflePlay(this.state.songs)}>
              Shuffle
            </Button>
          </View>
          <Divider />
          <FlatList
            data={this.state.songs}
            renderItem={({item}) => <TrackContainer track={item} />}
            ItemSeparatorComponent={() => <Divider inset={true} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.fetchData}
              />
            }
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

Song.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOfflineSongs: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  shufflePlay: PropTypes.func.isRequired,
  addToQueue: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {addToQueue, getOfflineSongs, shufflePlay},
)(withTheme(Song));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
});
