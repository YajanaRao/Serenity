import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { FavContainer } from '../../containers/FavContainer';
import { RepeatContainer } from '../../containers/RepeatContainer';
import { PlayerController } from '../../containers/PlayerController';
import { Progress } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { ActiveTrackDetails } from '../../components/ActiveTrackDetails';
import { RootReducerType } from '../../reducers';
import { PlaylistDialog } from '../../components/PlaylistDialog';
import { addToPlaylist } from '../../actions/playerState';

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
          <IconButton
            icon={props => <Icon name="menu-fold" {...props} />}
            onPress={() => navigation.navigate('Queue')}
          />
          <IconButton
            icon={props => <Icon name="addfolder" {...props} />}
            onPress={() => setVisible('DIALOG')}
          />
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
  },
});
