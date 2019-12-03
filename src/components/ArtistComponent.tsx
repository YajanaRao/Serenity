import React, { useState } from 'react';
import { Avatar, Badge, List } from 'react-native-paper';
import { View } from 'react-native';

interface ArtistProps {
  artist: string;
  artwork: string;
}

interface Props {
  item: ArtistProps;
  addArtist(item: ArtistProps): void;
  removeArtist(item: ArtistProps): void;
}

function ArtistComponent({ item, addArtist, removeArtist }: Props) {
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
          <Avatar.Image
            source={{ uri: item.artwork }}
            // size={80}
            style={{ margin: 0 }}
          />
        </View>
      )}
      onPress={selectArtits}
    />
  );
}

export default ArtistComponent;
