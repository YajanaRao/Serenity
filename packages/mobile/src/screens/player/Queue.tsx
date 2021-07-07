import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AlertDialog } from '../../components/Dialogs/AlertDialog';
import { Screen } from '@serenity/components';
import { QueueList } from './components/QueueList';
import { clearQueue } from '../../../../core/src';

export interface QueueScreenProps { }

export function QueueScreen({ navigation }: QueueScreenProps) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);


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
      <QueueList />
      <View style={{ height: 100 }} />
    </Screen>
  );
}
