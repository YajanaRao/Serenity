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
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addToQueue } from '../../actions/playerState';
import { deletePlaylist, renamePlaylist } from '../../actions/realmAction';
import TrackContainer from '../../containers/TrackContainer';
import DefaultImage from '../../components/DefaultImage';
import Screen from '../../components/Screen';
import EmptyPlaylist from '../../components/EmptyPlaylist';
import log, { logEvent } from '../../utils/logging';
import RenamePlaylistDailog from '../../components/RenamePlaylistDailog';

const RENAME_DIALOG = 'RENAME';
const PLAYLIST_DIALOG = 'PLAYLIST';

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
      visible: '',
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

  rename = playlistName => {
    const {
      playlist: { id },
    } = this.state;
    const { navigation } = this.props;
    renamePlaylist(id, playlistName);
    navigation.goBack();
  };

  hideDialog = () => {
    this.setState({
      visible: '',
    });
  };

  showRenameDailog = () => {
    this.setState({
      visible: RENAME_DIALOG,
    });
    this.bs.current.snapTo(1);
  };

  showPlaylistDailog = () => {
    this.setState({
      visible: PLAYLIST_DIALOG,
    });
  };

  openBottomSheet = () => {
    this.bs.current.snapTo(0);
  };

  renderInner = () => {
    const {
      theme: { colors },
    } = this.props;
    const { playlist } = this.state;
    const { name, owner } = playlist;
    return (
      <View style={styles.panel}>
        <LinearGradient
          colors={['transparent', colors.surface, colors.surface]}
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
        <Surface style={{ backgroundColor: colors.surface }}>
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
              <TouchableWithoutFeedback onPress={this.showRenameDailog}>
                <List.Item
                  title="Rename Playlist"
                  left={props => <List.Icon {...props} icon="playlist-edit" />}
                />
              </TouchableWithoutFeedback>
            </View>
          )}
        </Surface>
      </View>
    );
  };

  render() {
    const { playlist, visible } = this.state;
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
            renderContent={this.renderInner}
            initialSnap={1}
            callbackNode={this.sheetOpenValue}
          />
        </Portal>
        <RenamePlaylistDailog
          visible={visible === RENAME_DIALOG}
          hideDialog={this.hideDialog}
          playlistName={name}
          rename={this.rename}
        />

        {isEmpty(songs) ? (
          <EmptyPlaylist />
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <View style={{ margin: 12 }}>
                <View style={styles.coverContainer}>
                  <DefaultImage style={styles.artCover} />
                </View>
                <View style={styles.titleContainer}>
                  <Title>{name}</Title>
                  <Subheading>{`by ${owner}`}</Subheading>
                </View>
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={this.addToQueue}>
                    Play All
                  </Button>
                </View>
              </View>
            )}
            data={songs}
            renderItem={({ item }) => <TrackContainer track={item} />}
            ItemSeparatorComponent={() => <Divider inset />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 100 }} />}
          />
        )}
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
