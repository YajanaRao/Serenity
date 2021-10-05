import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Title,
  List,
  Subheading,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { useDispatch } from 'react-redux';
import { DefaultImage } from './DefaultImage';
import { RenamePlaylistDailog } from './Dialogs/RenamePlaylistDailog';
import { AlertDialog } from './Dialogs/AlertDialog';
import { log } from '../utils/logging';
import { deletePlaylist, renamePlaylist, Player } from '@serenity/core';
import { useNavigation } from '@react-navigation/core';

const RENAME_DIALOG = 'RENAME';
const DELETE_DAILOG = 'DELETE';

export const PlaylistOptions = ({ bottomSheetModalRef, songs, playlist }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState('');
  const dispatch = useDispatch();

  const snapPoints = React.useMemo(() => ['30%', '60%'], []);

  const deleteAlert = () => {
    closeBottomSheet();
    setVisible(DELETE_DAILOG);
  };

  const deleteAction = () => {
    dispatch(deletePlaylist(playlist.id));
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

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  };

  const addToQueue = () => {
    dispatch(Player.addSongToQueue(values(songs)));
  };

  const renderInner = () => {
    const { name, owner } = playlist;
    return (
      <BottomSheetScrollView style={{
        backgroundColor: colors.surface,
      }}>
        <View style={{ marginTop: 12 }}>
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
          <TouchableWithoutFeedback onPress={addToQueue}>
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
      </BottomSheetScrollView>
    );
  };

  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={() => (
          <View
            style={[{ backgroundColor: colors.surface }, styles.handle]}
          >
            <TouchableWithoutFeedback onPress={closeBottomSheet}>
              <IconButton icon="close" />
            </TouchableWithoutFeedback>
          </View>
        )}
      >
        {renderInner()}
      </BottomSheetModal>
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

    </View>
  );
};

const styles = StyleSheet.create({
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  handle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: 50,
    elevation: 2,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  }
});
