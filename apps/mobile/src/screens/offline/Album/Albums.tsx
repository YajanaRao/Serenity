import React, { useEffect, useRef } from 'react';
import { Divider } from 'react-native-paper';
import { RefreshControl, FlatList } from 'react-native';
import { isEmpty } from 'lodash';
import { useScrollToTop } from '@react-navigation/native';

import { Screen } from '@serenity/components';
import { Native, UI, useAppDispatch, useAppSelector, albumsSelectors, EntityId } from '@serenity/core';
import { Blank } from '../../../components/Blank';
import { Album } from './components/Album';

export const AlbumScreen = ({ }) => {
  const ref = useRef(null);
  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);
  const albums = useAppSelector(state => albumsSelectors.selectIds(state));
  const { loading, error } = useAppSelector(state => state.albums);

  const dispatch = useAppDispatch();
  useScrollToTop(ref);

  useEffect(() => {
    if (!albums.length) {
      fetchData();
    }
  }, [offlineReadAccessGiven]);

  const fetchData = () => {
    if (offlineReadAccessGiven && !loading) {
      dispatch(Native.getAlbums());
    }
  };

  if (!isEmpty(albums)) {
    return (
      <Screen>
        <FlatList
          ref={ref}
          data={albums}
          ItemSeparatorComponent={() => <Divider inset />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          keyExtractor={(index) => `album-${index.toString()}`}
          renderItem={({ item }: { item: EntityId }) => <Album id={item} />}
        />
      </Screen>
    );
  }

  if (!offlineReadAccessGiven) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(UI.giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }

  return <Blank text="No offline songs found.." fetchData={fetchData} />;
};


