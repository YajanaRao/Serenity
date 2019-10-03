import React, { Component } from 'react';
import { IconButton, withTheme, Title, Button, Chip, Divider, Surface, List, Dialog, Portal, TextInput, Subheading } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { addToQueue } from '../../actions/playerState';
import { deletePlaylist, renamePlaylist } from '../../actions/realmAction';
import TrackContainer from '../../containers/TrackContainer';
import DefaultImage from '../../components/DefaultImage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.bs = React.createRef();
    this.sheetOpenValue = new Animated.Value(1);
    this.state = {
      visible: false,
      playlist: props.navigation.getParam('playlist')
    }
  }

  static navigationOptions = ({ navigation }) => {
    // header: null
    return {
      headerTitle: navigation.getParam('title'),
      headerRight: (
        <IconButton
          icon="more-vert"
          onPress={navigation.getParam('openMenu')}
        />
      ),
    };
  };

  addToQueue = () => {
    let songs = this.props.navigation.getParam('songs');
    console.log(songs);
    this.props.addToQueue(songs);
  };

  deletePlaylist = () => {
    if (this.state.playlist.id) {
      Alert.alert(
        'Delete playlist',
        'Are you sure you want to delete ' + this.state.playlist.name,
        [
          {
            text: 'NO',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              deletePlaylist(this.state.playlist.id);
              this.props.navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );

    }
    this.bs.current.snapTo(3);
  }

  renamePlaylist = () => {
    renamePlaylist(this.state.playlist.id, this.state.playlist.name);
    this._hideDialog();
  }

  onChangeText = text => {
    this.setState({
      playlistName: text
    })
  }

  _hideDialog = () => {
    this.setState({
      visible: false
    })
  }

  _showDailog = () => {
    this.setState({
      visible: true
    })
    this.bs.current.snapTo(3);
  }

  componentDidMount() {
    this.props.navigation.setParams({ openMenu: this.openBottomSheet });
  }

  openBottomSheet = () => {
    if(this.state.playlist.owner != 'You'){
      this.bs.current.snapTo(2);
    }else if(this.state.playlist.songs < 1){
      this.bs.current.snapTo(1)
    }else{
      this.bs.current.snapTo(0);
    }
    
  }

  renderInner = () => (
    <Surface style={styles.panel}>
      {this.state.playlist.owner != 'You' ?
        <TouchableWithoutFeedback onPress={this.deletePlaylist}>
          <List.Item
            title="like"
            left={props => <List.Icon {...props} icon="favorite" />}
          />
        </TouchableWithoutFeedback> :
        <View>
          <TouchableWithoutFeedback onPress={this.deletePlaylist}>
            <List.Item
              title="Delete Playlist"
              left={props => <List.Icon {...props} icon="close" />}
            />
          </TouchableWithoutFeedback>
          {this.state.playlist.songs.length < 1 ? false : <TouchableWithoutFeedback onPress={this.renamePlaylist}>
            <List.Item
              title="Edit Playlist"
              left={props => <List.Icon {...props} icon="list" />}
            />
          </TouchableWithoutFeedback>}
          <TouchableWithoutFeedback onPress={this._showDailog}>
            <List.Item
              title="Rename Playlist"
              left={props => <List.Icon {...props} icon="edit" />}
            />
          </TouchableWithoutFeedback>
        </View>
      }

      <List.Item
        title="Share"
        left={props => <List.Icon {...props} icon="share" />}
      />
    </Surface>
  )



  render() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Portal>
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: 'rgba(0,0,0, .4)',
                ...StyleSheet.absoluteFillObject
              },
              {
                opacity: Animated.cond(Animated.greaterOrEq(this.sheetOpenValue, 0.95), 0, 1),
              },
            ]}
            pointerEvents="none"
          />
          <BottomSheet
            ref={this.bs}
            snapPoints={['50%', '35%', '25%', 0]}
            renderContent={this.renderInner}
            initialSnap={3}
            callbackNode={this.sheetOpenValue}
          />
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Renaming</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={this.state.playlistName}
                onChangeText={this.onChangeText}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Cancel</Button>
              <Button onPress={this.renamePlaylist}>Rename</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ScrollView>
          <View style={styles.scrollViewContent}>
            <View style={styles.coverContainer}>
              <DefaultImage style={styles.artCover} />
              {/* <Headline style={styles.title}>{title}</Headline> */}
            </View>
            <View style={styles.titleContainer}>
              <Title>{this.state.playlist.name}</Title>
              <Subheading>{"by " + this.state.playlist.owner}</Subheading>
              {/* <Chip icon="add" mode="contained" onPress={() => this.bs.current.snapTo(0)}>
                Add Songs
              </Chip> */}
            </View>
            {isEmpty(this.state.playlist.songs) ? (
              <View style={{ flex: 1, margin: 16 }}>
                <Title style={{ textAlign: 'center' }}>Let's find some songs for your playlist</Title>
                <Button>Find songs</Button>
              </View>
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

            <FlatList
              data={this.state.playlist.songs}
              renderItem={({ item }) => <TrackContainer track={item} />}
              ItemSeparatorComponent={() => <Divider inset={true} />}
              keyExtractor={(item, index) => index.toString()}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this.fetchData}
            //   />
            // }
            />
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </View>
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
  artCover: { width: 200, height: 200 },
  titleContainer: { alignItems: 'center', justifyContent: 'center', margin: 10 },
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    elevation: 12,
    zIndex: 1000
  },
});
