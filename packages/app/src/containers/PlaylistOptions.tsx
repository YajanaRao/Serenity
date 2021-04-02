import React, { useRef, useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Title,
  List,
  Portal,
  Subheading,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

import { useDispatch } from 'react-redux';
import { addToQueue } from '../actions/playerState';
import { DefaultImage } from '../components/DefaultImage';
import { deletePlaylist, renamePlaylist } from '../actions/realmAction';
import { RenamePlaylistDailog } from '../components/RenamePlaylistDailog';
import { AlertDialog } from '../components/AlertDialog';
import { log } from '../utils/logging';

const RENAME_DIALOG = 'RENAME';
const DELETE_DAILOG = 'DELETE';

export const PlaylistOptions = ({ route, navigation }) => {
  const bs = useRef();
  const theme = useTheme();
  const sheetOpenValue = new Animated.Value(1);
  const [visible, setVisible] = useState('');
  const dispatch = useDispatch();
  const { playlist } = route.params;
  const { colors } = theme;

  const deleteAlert = () => {
    closeBottomSheet();
    setVisible(DELETE_DAILOG);
  };

  const deleteAction = () => {
    deletePlaylist(playlist.id);
    navigation.goBack();
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
    const { songs } = route.params;
    dispatch(addToQueue(values(songs)));
  };

  const renderInner = () => {
    const { name, owner } = playlist;
    return (
      <View style={styles.panel}>
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderTopEndRadius: 12,
              borderTopStartRadius: 12,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '100%',
                height: 50,
                backgroundColor: colors.surface,
                marginBottom: 16,
                elevation: 2,
                borderTopEndRadius: 12,
                borderTopStartRadius: 12,
              }}
            >
              <TouchableWithoutFeedback onPress={closeBottomSheet}>
                <IconButton icon="close" />
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback
              onPress={closeBottomSheet}
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width,
              }}
            >
              <DefaultImage style={styles.artCover} />
              <Title>{name}</Title>
              <Subheading>{`by ${owner}`}</Subheading>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor: colors.surface }}>
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
                onPress={() => log.debug('playlist', 'playlist liked')}
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
                    left={props => (
                      <List.Icon {...props} icon="trash-outline" />
                    )}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={showRenameDailog}>
                  <List.Item
                    title="Rename Playlist"
                    left={props => <List.Icon {...props} icon="edit-outline" />}
                  />
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </View>
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
      <AlertDialog
        visible={visible === DELETE_DAILOG}
        title="Delete playlist"
        message={`Are you sure you want to delete ${playlist.name}`}
        action={deleteAction}
        hideDialog={hideDialog}
      />
      <IconButton icon="more-vertical-outline" onPress={openBottomSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  panel: {
    height: '100%',
    justifyContent: 'flex-end',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
});
