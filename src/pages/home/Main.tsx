import * as React from 'react';
import { ScrollView } from 'react-native';

import { NetNotify } from '../../components/NetNotify';
import { RecentContainer } from '../../containers/RecentContainer';
import { MostPlayedContainer } from '../../containers/MostPlayedContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { Screen } from '../../components/Screen';
import { ShortCutContainer } from '../../containers/ShortcutContainer';

export const MainScreen = () => {
  return (
    <Screen>
      <ScrollView>
        <NetNotify />
        <ShortCutContainer />
        <OnlineContainer />
        <RecentContainer />
        <MostPlayedContainer />
      </ScrollView>
    </Screen>
  );
};
