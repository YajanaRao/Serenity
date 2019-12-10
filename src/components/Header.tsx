import React, { useState } from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateQuery } from '../actions/mediaStore';

export const Header = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (text: string) => {
    setQuery(text);
    dispatch(updateQuery(text));
  };

  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Searchbar
        placeholder="Artists, songs or podcasts"
        onChangeText={handleChange}
        value={query}
        icon="magnify"
        style={{ margin: 10 }}
      />
    </View>
  );
};
