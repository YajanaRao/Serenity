import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { clearQueue } from '../../actions/playerState';
import { AlertDialog } from '../../components/AlertDialog';
import { Screen } from '../../components/Screen';
import { QueueContainer } from '../../containers/QueueContainer';

export interface QueueScreenProps {}

export function QueueScreen({ navigation }: QueueScreenProps) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const close = () => {
    navigation.goBack();
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
        <IconButton icon="trash-outline" onPress={openAlert} />
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
      <QueueContainer />
      <View style={{ height: 100 }} />
    </Screen>
  );
}
