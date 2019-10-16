import React, { useState } from 'react';
import { Chip, Avatar, Badge, Caption } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

function ArtistComponent(props) {
  const [selected, selectArtist] = useState(false);

  const selectArtits = () => {
    selectArtist(true);
    props.addArtist(props.item);
  };

  return (
    <TouchableOpacity
      style={{ margin: 8, justifyContent: 'center', alignItems: 'center' }}
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
        source={{ uri: props.item.artwork }}
        size={80}
        style={{ margin: 0 }}
      />
      <Caption>{props.item.artist}</Caption>
    </TouchableOpacity>
  );
}

export default ArtistComponent;
