import React, { useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { RefreshControl, FlatList } from 'react-native';
import { isEmpty } from 'lodash';
import { Screen } from '@serenity/components';
import { updateOfflineReadAccess, artistsSelectors, useAppSelector, useAppDispatch, Native, EntityId } from '@serenity/core';
import { Blank } from '../../../components/Blank';
import { Artist } from './components/Artist';


interface ItemProps {
  item: EntityId;
}

export const ArtistsScreen = ({ }) => {
  const dispatch = useAppDispatch();
  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);
  const { loading, error } = useAppSelector(state => state.artists);
  const artists = useAppSelector(state => artistsSelectors.selectIds(state));

  useEffect(() => {
    if (!artists.length) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    dispatch(Native.getArtists());
  };

  if (!isEmpty(artists)) {
    return (
      <Screen>
        <FlatList
          data={artists}
          ItemSeparatorComponent={() => <Divider inset />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          keyExtractor={(item) => `${item.toString()}`}
          renderItem={({ item }: ItemProps) => <Artist id={item} />}
        />
      </Screen>
    );
  }

  if (!offlineReadAccessGiven || error) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(updateOfflineReadAccess())}
        buttonText="Allow Access"
      />
    );
  }
  return <Blank text="No offline Artists found.." fetchData={fetchData} />;
};

