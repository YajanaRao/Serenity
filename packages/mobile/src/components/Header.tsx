import React, { useEffect, useState } from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import { Keyboard, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { updateQuery } from '../../../core/src/actions/media';
import { useNetInfo } from '@react-native-community/netinfo';

export const Header = ({
  containerStyle = {},
  goBack,
}: {
  containerStyle?: ViewStyle;
  goBack?: () => void;
}) => {

  const [query, setQuery] = useState('');
  const { params } = useRoute();
  const netInfo = useNetInfo();


  const dispatch = useDispatch();

  useEffect(() => {
    const { query } = params;
    if (query) {
      setQuery(query)
    }
  }, [])

  useEffect(() => {
    let category = netInfo.isConnected ? "online" : "offline";
    const { type } = params;
    if (type) {
      category = type;
    }
    const timeOutId = setTimeout(
      () => dispatch(updateQuery(query, category)),
      200,
    );
    return () => clearTimeout(timeOutId);
  }, [query]);

  const handleChange = (text: string) => {
    setQuery(text);
  };

  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={[{ backgroundColor: colors.surface }, containerStyle]}>
      <Searchbar
        style={{ borderRadius: 0 }}
        placeholder="Artists, songs or podcasts"
        onChangeText={handleChange}
        value={query}
        icon={goBack ? 'arrow-back-outline' : 'search-outline'}
        onIconPress={() => (goBack ? goBack() : Keyboard.dismiss())}
        clearIcon={query ? "close-outline" : "mic-outline"}
        autoFocus
      />
    </View>
  );
};
