import React, { useRef } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { useScrollToTop } from '@react-navigation/native';
import { NetNotify } from '../../components/NetNotify';
import { RecentContainer } from './views/RecentContainer';
import { MostPlayedContainer } from './views/MostPlayedContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { Screen } from '@serenity/components';
import { ShortCutContainer } from './views/ShortcutContainer';

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
        {/* <OnlineSongsContainer />
        <Divider />
        {Platform.OS !== "ios" && <YoutubeSongsContainer />}
        <Divider />
        <JioSaavnContainer /> */}
      </ScrollView>
    </Screen>
  );
};
