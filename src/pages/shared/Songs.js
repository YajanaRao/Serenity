import React, { Component } from 'react';
import { IconButton, withTheme, Title, Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { addToQueue } from '../../actions/playerState';
import SwipeListContainer from '../../containers/SwipeListContainer';
import DefaultImage from '../../components/DefaultImage';

class Songs extends Component {
  static navigationOptions = ({ navigation }) => {
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

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ addToQueue: this.addToQueue });
  }

  addToQueue = () => {
    const { navigation, addToQueue } = this.props;
    const songs = navigation.getParam('songs');
    addToQueue(songs);
  };

  render() {
    const { navigation, theme } = this.props;

    const songs = navigation.getParam('songs', []);
    const albumImage = navigation.getParam('img');
    const title = navigation.getParam('title', 'No Title');

    const { colors } = theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView>
          <View style={styles.scrollViewContent}>
            <View style={styles.coverContainer}>
              {albumImage ? (
                <FastImage
                  source={{ uri: albumImage }}
                  style={styles.artCover}
                />
              ) : (
                <DefaultImage style={styles.artCover} />
              )}
              {/* <Headline style={styles.title}>{title}</Headline> */}
            </View>
            <View style={styles.titleContainer}>
              <Title>{title}</Title>
            </View>
            {isEmpty(songs) ? (
              <Title>No songs</Title>
            ) : (
              <View style={styles.buttonContainer}>
                {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button> */}
                <Button mode="contained" onPress={this.addToQueue}>
                  Play All
                </Button>
              </View>
            )}

            <SwipeListContainer data={songs} />
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Songs.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  addToQueue: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addToQueue },
)(withTheme(Songs));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    marginTop: 10,
  },
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
