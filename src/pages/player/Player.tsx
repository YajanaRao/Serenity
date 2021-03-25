import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon';
import { FavContainer } from '../../containers/FavContainer';
import { RepeatContainer } from '../../containers/RepeatContainer';
import { PlayerController } from '../../containers/PlayerController';
import { Progress } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { ActiveTrackDetails } from '../../components/ActiveTrackDetails';
import { RootReducerType } from '../../reducers';
import { PlaylistDialog } from '../../components/PlaylistDialog';
import { addToPlaylist } from '../../actions/playerState';
import { downloadMedia } from '../../actions/mediaStore';
import { notify } from '../../actions';

export const PlayerScreen = ({ navigation }) => {
  const [visible, setVisible] = useState('');
  const dispatch = useDispatch();
  const close = () => {
    navigation.goBack();
  };

  const addSongToPlaylist = (id: string) => {
    dispatch(addToPlaylist(id, active));
    setVisible('');
  };

  const active = useSelector(
    (state: RootReducerType) => state.playerState.active,
  );

  function download() {
    dispatch(
      notify(
        'Started download. You will be notified once the file is downloaded',
      ),
    );
    dispatch(downloadMedia(active));
    setVisible('');
  }

  return (
    <Screen>
      <PlaylistDialog
        visible={visible === 'DIALOG'}
        hideModal={() => setVisible('')}
        addToPlaylist={addSongToPlaylist}
      />
      <View style={styles.playerContainer}>
        <View style={styles.container}>
          <IconButton icon="close" onPress={close} />
        </View>
        <ActiveTrackDetails track={active} />
        <View style={styles.centerContainer}>
          <Progress />
        </View>
        <View style={styles.playerToolbox}>
          <FavContainer item={active} type="song" style={{ flex: 1 }} />
          <PlayerController />
          <RepeatContainer />
        </View>
        <View style={styles.extraMenuContainer}>
          <View style={styles.extraIcon}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon={props => <Icon name="menu-outline" {...props} />}
              onPress={() => navigation.navigate('Queue')}
            />
            <Caption style={{ padding: 0, margin: 0 }}>Queue</Caption>
          </View>
          <View style={styles.extraIcon}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon={props => <Icon name="download-outline" {...props} />}
              onPress={download}
            />
            <Caption>Download</Caption>
          </View>
          <View style={styles.extraIcon}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon={props => (
                <Icon
                  name="folder-add-outline"
                  {...props}
                  style={{ padding: 0, margin: 0 }}
                />
              )}
              onPress={() => setVisible('DIALOG')}
            />
            <Caption>Playlist</Caption>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  extraMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  extraIcon: { justifyContent: 'center', alignItems: 'center' },
});
