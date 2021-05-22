import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearQueue } from '../../actions/playerState';
import { AlertDialog } from '../../components/AlertDialog';
import { Screen, Title } from 'components';
import { Track } from '../../components/Track';
import { QueueContainer } from '../../containers/QueueContainer';
import { RootReducerType } from '../../reducers';

export interface QueueScreenProps { }

export function QueueScreen({ navigation }: QueueScreenProps) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const active = useSelector(
    (state: RootReducerType) => state.playerState.active,
  );

  const close = () => {
    navigation.navigate('Home');
  };

  const openAlert = () => {
    setVisible(true);
  };

  const clearQueueSongs = () => {
    dispatch(clearQueue());
    close();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Chip icon="trash-outline" mode="outlined" onPress={openAlert}>
          Clear Queue
        </Chip>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <AlertDialog
        visible={visible}
        hideDialog={() => setVisible(false)}
        action={clearQueueSongs}
        title="Clear Queue"
        message="Clear queue would stop current playing song"
      />
      <Title style={{ margin: 8 }}>Now Playing</Title>
      <Track track={active} play={() => navigation.goBack()} active />
      <Title style={{ margin: 8 }}>Next in Queue</Title>
      <QueueContainer />
      <View style={{ height: 100 }} />
    </Screen>
  );
}
