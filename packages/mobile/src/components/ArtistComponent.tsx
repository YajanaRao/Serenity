import React, { useState } from 'react';
import { Avatar, Badge, List } from 'react-native-paper';
import { View } from 'react-native';
import generate from 'string-to-color';
import { ArtistProps } from '../utils/types';

interface Props {
  item: ArtistProps;
  addArtist(item: ArtistProps): void;
  removeArtist(item: ArtistProps): void;
}

export const ArtistComponent = ({ item, addArtist, removeArtist }: Props) => {
  const [selected, selectArtist] = useState(false);

  const selectArtits = () => {
    if (selected) {
      removeArtist(item);
      selectArtist(false);
    } else {
      selectArtist(true);
      addArtist(item);
    }
  };

  return (
    <List.Item
      title={item.artist}
      left={() => (
        <View>
          <Badge
            style={{
              right: 2,
              top: -2,
              position: 'absolute',
              zIndex: 10,
            }}
            size={24}
            visible={selected}
          />
          <Avatar.Text
            size={54}
            style={{ backgroundColor: generate(item.name), margin: 0 }}
            label={item.artist.charAt(0)}
          />
        </View>
      )}
      onPress={selectArtits}
    />
  );
};
