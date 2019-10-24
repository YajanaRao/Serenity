import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

const Follow = ({ style, liked, addToFavorite, removeFromFavorite }) => {
  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      {liked ? (
        <Chip mode="outlined" onPress={removeFromFavorite}>
          Following
        </Chip>
      ) : (
        <Chip icon="plus" mode="outlined" onPress={addToFavorite}>
          Follow
        </Chip>
      )}
    </View>
  );
};

export default Follow;
