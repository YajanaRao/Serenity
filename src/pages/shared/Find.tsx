import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/Screen';
import { TrackContainer } from '../../containers/TrackContainer';
import { RootReducerType } from '../../reducers';
import { TrackProps } from '../../types';

export interface FindScreenProps {}

export function FindScreen({ navigation }: FindScreenProps) {
  const searchResult = useSelector(
    (state: RootReducerType) => state.query.searchResult,
  );

  return (
    <Screen>
      {searchResult ? (
        <FlatList
          data={searchResult}
          key={searchResult.length}
          // ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: TrackProps }) => (
            <TrackContainer track={item} goBack={navigation.goBack} />
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
