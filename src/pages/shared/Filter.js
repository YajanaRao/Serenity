import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Title, Button, withTheme, IconButton} from 'react-native-paper';
import isEqual from 'lodash/isEqual';
import {connect} from 'react-redux';

import {addToQueue} from '../../actions/playerState';
import {filterAlbumSongs, filterArtistSongs} from '../../actions/mediaStore';
import SwipeListContainer from '../../containers/SwipeListContainer';
import DefaultImage from '../../components/DefaultImage';

class Filter extends Component {
  static navigationOptions = ({navigation}) => {
    // header: null
    return {
      headerTitle: navigation.getParam('title'),
      headerRight: (
        <IconButton
          icon="play-circle-outline"
          onPress={navigation.getParam('addToQueue')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      refreshing: false,
    };
  }

  addToQueue = () => {
    this.props.addToQueue(this.state.files);
  };

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.files, state.files) || state.refreshing) {
      return {
        files: props.files,
        refreshing: false,
      };
    }
    return null;
  }

  fetchData = () => {
    this.setState({
      refreshing: true,
    });
    const {navigation} = this.props;

    const album = navigation.getParam('album', null);
    const artist = navigation.getParam('artist', null);
    const image = navigation.getParam('img');

    if (artist) {
      this.props.filterArtistSongs(artist, image);
    } else if (album) {
      this.props.filterAlbumSongs(album, image);
    }
  };

  componentDidMount() {
    this.fetchData();
    this.props.navigation.setParams({addToQueue: this.addToQueue});
  }

  render() {
    const {colors} = this.props.theme;
    const {navigation} = this.props;

    const albumImage = navigation.getParam('img');
    const title = navigation.getParam('title', 'No Title');

    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData}
            />
          }>
          <View style={styles.scrollViewContent}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
              }}>
              {albumImage ? (
                <FastImage source={{uri: albumImage}} style={styles.artCover} />
              ) : (
                <DefaultImage style={styles.artCover} />
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <Title>{title}</Title>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 8,
              }}>
              {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                            Download
                        </Button> */}
              <Button
                mode="contained"
                onPress={() => this.props.addToQueue(this.state.files)}>
                Play All
              </Button>
            </View>
            <SwipeListContainer
              data={this.state.files}
              fetchData={this.fetchData}
            />
            <View style={{height: 100}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  files: state.mediaStore.files,
});

export default connect(
  mapStateToProps,
  {addToQueue, filterAlbumSongs, filterArtistSongs},
)(withTheme(Filter));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    marginTop: 10,
  },
  artCover: {width: 200, height: 200, backgroundColor: '#d7d1c9'},
});
