import React, { useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { RefreshControl, FlatList } from 'react-native';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Screen } from '@serenity/components';
import { fetchOfflineArtists, selectArtistIds, giveReadOfflineAccess } from '@serenity/core';
import { Blank } from '../../../components/Blank';

import { RootReducerType } from '../../../../../core/src/reducers';
import { Artist } from './components/Artist';

interface ItemProps {
  item: string;
}

export const ArtistsScreen = ({ }) => {
  const dispatch = useDispatch();
  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.user,
  );
  const { loading, error } = useSelector(state => state.media.artists);
  const artists = useSelector(state => selectArtistIds(state));

  useEffect(() => {
    if (!artists.length) {
      fetchData();
    }
  }, [offlineReadAccessGiven]);

  const fetchData = () => {
    if (offlineReadAccessGiven && !loading) {
      dispatch(fetchOfflineArtists());
    }
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
          keyExtractor={(item) => item}
          renderItem={({ item }: ItemProps) => <Artist id={item} />}
        />
      </Screen>
    );
  }
  if (!offlineReadAccessGiven || error) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }
  return <Blank text="No offline Artists found.." fetchData={fetchData} />;
};
