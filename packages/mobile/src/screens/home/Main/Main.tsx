import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Screen } from '@serenity/components';

import { useScrollToTop } from '@react-navigation/native';
import { NetNotify } from '../../../components/NetNotify';
import { RecentContainer } from './components/RecentContainer';
import { MostPlayedContainer } from './components/MostPlayedContainer';
import { ShortCutContainer } from './components/ShortcutContainer';
import { QuoteCard } from './components/QuoteCard';

const Divider = () => <View style={{ marginVertical: 8 }} />;

export const MainScreen = () => {
  const ref = React.useRef();
  useScrollToTop(ref);
  return (
    <Screen>
      <ScrollView ref={ref}>
        <NetNotify />
        <ShortCutContainer />
        <QuoteCard />
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
