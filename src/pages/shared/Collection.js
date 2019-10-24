import React, { Component } from 'react';
import {
  IconButton,
  withTheme,
  Title,
  Button,
  Divider,
  Surface,
  List,
  Dialog,
  Portal,
  TextInput,
  Subheading,
} from 'react-native-paper';
import { StyleSheet, View, Dimensions, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addToQueue } from '../../actions/playerState';
import { deletePlaylist, renamePlaylist } from '../../actions/realmAction';
import TrackContainer from '../../containers/TrackContainer';
import DefaultImage from '../../components/DefaultImage';
import Screen from '../../components/Screen';
import log, { logEvent } from '../../utils/logging';

// fix on click issue

class Collection extends Component {
  static navigationOptions = ({ navigation }) => {
    // header: null
    return {
      headerTitle: navigation.getParam('playlist').name,
      headerRight: (
        <IconButton
          icon="dots-vertical"
          onPress={navigation.getParam('openMenu')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.bs = React.createRef();
    this.sheetOpenValue = new Animated.Value(1);
    this.state = {
      visible: false,
      playlist: props.navigation.getParam('playlist'),
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ openMenu: this.openBottomSheet });
  }

  addToQueue = () => {
    const { addToQueue } = this.props;
    const { playlist } = this.state;
    const { songs } = playlist;
    addToQueue(values(songs));
  };

  deletePlaylist = () => {
    const {
      playlist: { id, name },
    } = this.state;
    const { navigation } = this.props;

    if (id) {
      Alert.alert(
        'Delete playlist',
        `Are you sure you want to delete ${name}`,
        [
          {
            text: 'NO',
            onPress: () => log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              deletePlaylist(id);
              navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );
    }
    this.bs.current.snapTo(1);
  };

  renamePlaylist = () => {
    const {
      playlist: { id, name },
    } = this.state;
    renamePlaylist(id, name);
    this.hideDialog();
  };

  sharePlaylist = () => {
    this.bs.current.snapTo(1);
    const { playlist } = this.state;
    const options = {
      title: 'Share file',
      message: `Listen to ${playlist.name} playlist on Serenity`,
      subject: 'Checkout the playlist',
      url:
        'data:image/png;base64,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',
      failOnCancel: false,
    };
    Share.open(options)
      .then(res => {
        log(res);
      })
      .catch(err => {
        log(err);
      });
  };

  onChangeText = text => {
    this.setState({
      playlistName: text,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  showDailog = () => {
    this.setState({
      visible: true,
    });
    this.bs.current.snapTo(1);
  };

  openBottomSheet = () => {
    this.bs.current.snapTo(0);
  };

  renderInner = colors => {
    const { playlist } = this.state;
    const { name, owner, songs } = playlist;
    return (
      <View style={styles.panel}>
        <LinearGradient
          colors={['rgba(0,0,0, .9)', colors.surface]}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.bs.current.snapTo(1)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width,
            }}
          >
            <DefaultImage style={styles.artCover} />
            <Title>{name}</Title>
            <Subheading>{`by ${owner}`}</Subheading>
          </TouchableWithoutFeedback>
        </LinearGradient>
        <Surface>
          <TouchableWithoutFeedback onPress={this.addToQueue}>
            <List.Item
              title="Play All"
              left={props => (
                <List.Icon {...props} icon="play-circle-outline" />
              )}
            />
          </TouchableWithoutFeedback>
          {owner !== 'You' ? (
            <TouchableWithoutFeedback
              onPress={() => logEvent('playlist', 'playlist liked')}
            >
              <List.Item
                title="like"
                left={props => <List.Icon {...props} icon="heart" />}
              />
            </TouchableWithoutFeedback>
          ) : (
            <View>
              <TouchableWithoutFeedback onPress={this.deletePlaylist}>
                <List.Item
                  title="Delete Playlist"
                  left={props => <List.Icon {...props} icon="close" />}
                />
              </TouchableWithoutFeedback>
              {songs.length < 1 ? (
                false
              ) : (
                <TouchableWithoutFeedback onPress={this.renamePlaylist}>
                  <List.Item
                    title="Edit Playlist"
                    left={props => (
                      <List.Icon {...props} icon="playlist-edit" />
                    )}
                  />
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback onPress={this.showDailog}>
                <List.Item
                  title="Rename Playlist"
                  left={props => <List.Icon {...props} icon="playlist-edit" />}
                />
              </TouchableWithoutFeedback>
            </View>
          )}

          <TouchableWithoutFeedback onPress={this.sharePlaylist}>
            <List.Item
              title="Share"
              left={props => <List.Icon {...props} icon="share" />}
            />
          </TouchableWithoutFeedback>
        </Surface>
      </View>
    );
  };

  render() {
    const {
      theme: { colors },
    } = this.props;
    const { playlist, visible, playlistName } = this.state;
    const { name, owner, songs } = playlist;

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
            renderContent={() => this.renderInner(colors)}
            initialSnap={1}
            callbackNode={this.sheetOpenValue}
          />
        </Portal>
        <Portal>
          <Dialog visible={visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Renaming</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={playlistName}
                onChangeText={this.onChangeText}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Cancel</Button>
              <Button onPress={this.renamePlaylist}>Rename</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.scrollViewContent}>
          <FlatList
            ListHeaderComponent={() => (
              <View>
                <View style={styles.coverContainer}>
                  <DefaultImage style={styles.artCover} />
                </View>
                <View style={styles.titleContainer}>
                  <Title>{name}</Title>
                  <Subheading>{`by ${owner}`}</Subheading>
                </View>
                {isEmpty(songs) ? (
                  <View style={{ flex: 1, margin: 16 }}>
                    <Title style={{ textAlign: 'center' }}>
                      Let's find some songs for your playlist
                    </Title>
                    <Button>Find songs</Button>
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={this.addToQueue}>
                      Play All
                    </Button>
                  </View>
                )}
              </View>
            )}
            data={songs}
            renderItem={({ item }) => <TrackContainer track={item} />}
            ItemSeparatorComponent={() => <Divider inset />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 100 }} />}
          />
          <View style={{ height: 100 }} />
        </View>
      </Screen>
    );
  }
}

export default connect(
  null,
  { addToQueue },
)(withTheme(Collection));

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
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // elevation: 12,
    zIndex: 1000,
  },
});
