import React from 'react';
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Divider } from 'react-native-paper';
import { View } from 'react-native';
import { Title } from '@serenity/components';

import { useNavigation } from '@react-navigation/core';
import { RootReducerType } from '@serenity/core/reducer';
import { Track } from '../../../components/Track';
import { TrackItem } from './TrackItem';
import { TrackSurface } from './TrackSurface';

interface Props { }

interface ItemProps {
  item: string;
}

export const QueueList = ({ }: Props) => {
  const navigation = useNavigation();
  const active = useSelector(
    (state: RootReducerType) => state.player.track,
  );

  const queue = useSelector(state => state.player.queue);
  console.log('queue: ', queue);

  return (
    <View>
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
        keyExtractor={(item) => item}
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
    </View>
  );

};


