import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AlertDialog } from '../../components/Dialogs/AlertDialog';
import { Screen, Title } from '@serenity/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { clearQueue, EntityId, queueSelectors, useAppSelector } from '@serenity/core';
import { TrackItem } from './components/TrackItem';
import { Track } from 'components/Track';
import { TrackSurface } from './components/TrackSurface';

export interface QueueScreenProps { }

interface ItemProps {
  item: EntityId;
}

export function QueueScreen({ navigation }: QueueScreenProps) {
  const dispatch = useDispatch();
  const active = useAppSelector((state) => state.player.track);
  const queue = useAppSelector(state => queueSelectors.selectIds(state));

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
        <Chip icon="trash-outline" mode="outlined" onPress={openAlert} disabled={!queue.length}>
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
      <SwipeListView
        data={queue}
        ListHeaderComponent={() => (
          <View>
            <Title style={{ margin: 8 }}>Now Playing</Title>
            <Track track={active} play={() => navigation.goBack()} active />
            <Title style={{ margin: 8 }}>Next in Queue</Title>
          </View>
        )}
        renderItem={({ item }: ItemProps) => <TrackItem id={item} />}
        ItemSeparatorComponent={() => <Divider inset />}
        keyExtractor={(index) => index.toString()}
        renderHiddenItem={({ item }) => <TrackSurface id={item} />}
        leftOpenValue={75}
        rightOpenValue={-75}
        closeOnRowPress
        closeOnRowOpen
        useNativeDriver
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: 100 }}>
            <Title>No Songs in the queue</Title>
          </View>
        )}
      />
      <View style={{ height: 100 }} />
    </Screen>
  );
}
