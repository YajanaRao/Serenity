import React from 'react';
import { View, SectionList } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from 'components';
import { TrackContainer } from '../../containers/TrackContainer';
import { RootReducerType } from '../../reducers';
import { TrackProps } from '../../utils/types';

export interface FindScreenProps { }

export function FindScreen({ navigation }: FindScreenProps) {
  const searchResult = useSelector(
    (state: RootReducerType) => state.query.searchResult,
  );

  return (
    <Screen>
      {searchResult && searchResult.length ? (
        <SectionList
          keyboardShouldPersistTaps="always"
          sections={searchResult}
          // ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: TrackProps }) => (
            <TrackContainer track={item} goBack={navigation.goBack} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <List.Subheader>{title}</List.Subheader>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No songs found</Text>
        </View>
      )}
    </Screen>
  );
}
