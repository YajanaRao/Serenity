import React, { useRef, useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Title,
  Surface,
  List,
  Portal,
  Subheading,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';

import { DefaultImage } from '../components/DefaultImage';
import { deletePlaylist, renamePlaylist } from '../actions/realmAction';
import log, { logEvent } from '../utils/logging';
import { RenamePlaylistDailog } from '../components/RenamePlaylistDailog';

const RENAME_DIALOG = 'RENAME';

export const PlaylistOptions = ({ playlist, navigation }) => {
  const bs = useRef();
  const theme = useTheme();
  const sheetOpenValue = new Animated.Value(1);
  const [visible, setVisible] = useState('');

  const { colors } = theme;

  const deleteAlert = () => {
    const { id, name } = playlist;
    closeBottomSheet();

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
  };

  const rename = (playlistName: string) => {
    const { id } = playlist;
    hideDialog();
    renamePlaylist(id, playlistName);
    navigation.goBack();
  };

  const hideDialog = () => {
    setVisible('');
  };

  const showRenameDailog = () => {
    closeBottomSheet();
    setVisible(RENAME_DIALOG);
  };

  const openBottomSheet = () => {
    bs.current.snapTo(0);
  };

  const closeBottomSheet = () => {
    bs.current.snapTo(1);
  };

  const addSongToQueue = () => {
    dispatch(addToQueue(values(songs)));
  };

  const renderInner = () => {
    const { name, owner } = playlist;
    return (
      <View style={styles.panel}>
        <LinearGradient
          colors={['transparent', colors.surface, colors.surface]}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableWithoutFeedback
            onPress={closeBottomSheet}
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
          <TouchableWithoutFeedback onPress={addSongToQueue}>
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
              <TouchableWithoutFeedback onPress={deleteAlert}>
                <List.Item
                  title="Delete Playlist"
                  left={props => <List.Icon {...props} icon="close" />}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={showRenameDailog}>
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

  return (
    <View>
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
                Animated.greaterOrEq(sheetOpenValue, 0.95),
                0,
                1,
              ),
            },
          ]}
          pointerEvents="none"
        />
        <BottomSheet
          ref={bs}
          snapPoints={['100%', 0]}
          renderContent={renderInner}
          initialSnap={1}
          callbackNode={sheetOpenValue}
        />
      </Portal>
      <RenamePlaylistDailog
        visible={visible === RENAME_DIALOG}
        hideDialog={hideDialog}
        playlistName={playlist.name}
        rename={rename}
      />
      <IconButton icon="dots-vertical" onPress={openBottomSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // elevation: 12,
    zIndex: 1000,
  },
});
