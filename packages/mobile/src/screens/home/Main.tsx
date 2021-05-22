import React, { useRef } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { useScrollToTop } from '@react-navigation/native';
import { NetNotify } from '../../components/NetNotify';
import { RecentContainer } from './components/RecentContainer';
import { MostPlayedContainer } from './components/MostPlayedContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { Screen } from 'components';
import { ShortCutContainer } from './components/ShortcutContainer';
import OnlineSongsContainer from './components/OnlineSongsContainer';
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
        {Platform.OS !== "ios" && <YoutubeSongsContainer />}
        <Divider />
        <JioSaavnContainer />
      </ScrollView>
    </Screen>
  );
};
