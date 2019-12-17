import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import { NetNotify } from '../../components/NetNotify';
import { RecentContainer } from '../../containers/RecentContainer';
import { MostPlayedContainer } from '../../containers/MostPlayedContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { Screen } from '../../components/Screen';
import { ShortCutContainer } from '../../containers/ShortcutContainer';
import { useScrollToTop } from '@react-navigation/native';

export const MainScreen = () => {
  const ref = useRef();
  useScrollToTop(ref);
  return (
    <Screen>
      <ScrollView ref={ref}>
        <NetNotify />
        <ShortCutContainer />
        <OnlineContainer />
        <RecentContainer />
        <MostPlayedContainer />
      </ScrollView>
    </Screen>
  );
};
