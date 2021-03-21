import React, { useState } from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import { Keyboard, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateQuery } from '../actions/mediaStore';

export const Header = ({
  category = 'all',
  containerStyle = {},
  goBack,
}: {
  category?: string;
  containerStyle?: ViewStyle;
  goBack?: () => void;
}) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (text: string) => {
    setQuery(text);

    dispatch(updateQuery(text, category));
  };

  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={[{ backgroundColor: colors.background }, containerStyle]}>
      <Searchbar
        placeholder="Artists, songs or podcasts"
        onChangeText={handleChange}
        value={query}
        icon={goBack ? 'arrow-back-outline' : 'search-outline'}
        onIconPress={() => (goBack ? goBack() : Keyboard.dismiss())}
        autoFocus
      />
    </View>
  );
};
