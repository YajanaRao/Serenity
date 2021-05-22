import React, { useEffect, useState } from 'react';
import { Searchbar, useTheme } from 'react-native-paper';
import { Keyboard, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { updateQuery } from '../actions/mediaStore';
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
    let type = netInfo.isConnected ? "online" : "offline";
    if(params?.type){
      type = params?.type;
    }
    const timeOutId = setTimeout(
      () => dispatch(updateQuery(query, type)),
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
        clearIcon="close-outline"
        autoFocus
      />
    </View>
  );
};
