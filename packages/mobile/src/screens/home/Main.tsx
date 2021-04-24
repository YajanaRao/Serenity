import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';

import { useScrollToTop } from '@react-navigation/native';
import { NetNotify } from '../../components/NetNotify';
import { RecentContainer } from '../../containers/RecentContainer';
import { MostPlayedContainer } from '../../containers/MostPlayedContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { Screen } from '../../components/Screen';
import { ShortCutContainer } from '../../containers/ShortcutContainer';
import OnlineSongsContainer from '../../containers/OnlineSongsContainer';
import YoutubeSongsContainer from './components/YoutubeSongsList';
import { JioSaavnContainer } from './components/JioSaavnList';

const Divider = () => <View style={{ marginVertical: 8 }} />;

export const MainScreen = () => {
  const ref = useRef();
  useScrollToTop(ref);
  return (
    <Screen>
      <ScrollView ref={ref}>
        <NetNotify />
        <ShortCutContainer />
        <OnlineContainer />
        <Divider />
        <RecentContainer />
        <Divider />
        <MostPlayedContainer />
        <Divider />
        <OnlineSongsContainer />
        <Divider />
        <YoutubeSongsContainer />
        <Divider />
        <JioSaavnContainer />
      </ScrollView>
    </Screen>
  );
};
