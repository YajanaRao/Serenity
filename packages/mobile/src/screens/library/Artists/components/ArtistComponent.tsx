import React, { useState } from 'react';
import { Avatar, Badge, List } from 'react-native-paper';
import { View } from 'react-native';
import generate from 'string-to-color';
import { ArtistProps } from '../../../../utils/types';
import { useSelector } from 'react-redux';
import { selectArtistById } from '../../../../../../core/src';

interface Props {
  id: string;
  toggleLike(id: string): void;
}

export const ArtistComponent = ({ id, toggleLike }: Props) => {
  const artist = useSelector(state => selectArtistById(state, id))
  const [selected, selectArtist] = useState(false);

  const selectArtits = () => {
    selectArtist(!selected)
    toggleLike(id);
  };

  return (
    <List.Item
      title={artist.artist}
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
            style={{ backgroundColor: generate(artist.name), margin: 0 }}
            label={artist.artist.charAt(0)}
          />
        </View>
      )}
      onPress={selectArtits}
    />
  );
};
