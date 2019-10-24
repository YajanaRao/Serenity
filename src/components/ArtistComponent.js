import React, { useState } from 'react';
import { Avatar, Badge, Caption } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

function ArtistComponent({ item, addArtist }) {
  const [selected, selectArtist] = useState(false);

  const selectArtits = () => {
    selectArtist(true);
    addArtist(item);
  };

  return (
    <TouchableOpacity
      style={{
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
      onPress={selectArtits}
    >
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
      <Caption>{item.artist}</Caption>
    </TouchableOpacity>
  );
}

export default ArtistComponent;
