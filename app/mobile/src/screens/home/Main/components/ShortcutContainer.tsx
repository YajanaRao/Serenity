import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Caption, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { Player } from '@serenity/core';
import { Neomorph } from 'react-native-neomorph-shadows';


export const ShortCutContainer = () => {
  const { colors } = useTheme();
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToHistory = React.useMemo(
    () => () => {
      navigation.navigate('History');
    },
    [navigation],
  );

  const navigateToFavorite = React.useMemo(
    () => () => {
      navigation.navigate('Favorites');
    },
    [navigation],
  );

  const navigateToMostPlayed = React.useMemo(
    () => () => {
      navigation.navigate('MostPlayed');
    },
    [navigation],
  );

  const startSongs = () => {
    dispatch(Player.startRadio());
  };

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.shortcutContainer}
        onPress={navigateToHistory}
      >
        <Neomorph
          darkShadowColor={'black'}
          lightShadowColor={'white'}
          style={{
            shadowRadius: 8,
            borderRadius: 30,
            backgroundColor: colors.surface,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >
          <Avatar.Icon
            icon="bar-chart-outline"
            color="#46b3e6"
            style={{ backgroundColor: '#46b3e650' }}
          />
        </Neomorph>
        <Caption>History</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutContainer}
        onPress={navigateToFavorite}
      >
        <Neomorph
          // swapShadows // <- change zIndex of each shadow color
          darkShadowColor={"black"}
          lightShadowColor={ "white"}
          style={{
            shadowRadius: 8,
            borderRadius: 30,
            backgroundColor: colors.surface,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >

          <Avatar.Icon
            icon="heart-outline"
            color="#c70d3a"
            style={{ backgroundColor: '#c70d3a50' }}
          />
        </Neomorph>
        <Caption>Favorite</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutContainer}
        onPress={navigateToMostPlayed}
      >
        <Neomorph
          // swapShadows // <- change zIndex of each shadow color
          darkShadowColor={"black"}
          lightShadowColor={ "white"}
          style={{
            shadowRadius: 8,
            borderRadius: 30,
            backgroundColor: colors.surface,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >

          <Avatar.Icon
            icon="trending-up-outline"
            color="#4a47a3"
            style={{ backgroundColor: '#4a47a350' }}
          />
        </Neomorph>
        <Caption>Most Played</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutContainer}
        onPress={startSongs}
      >
        <Neomorph
          // swapShadows // <- change zIndex of each shadow color
          darkShadowColor={"black"}
          lightShadowColor={ "white"}
          style={{
            shadowRadius: 8,
            borderRadius: 30,
            backgroundColor: colors.surface,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >
          <Avatar.Icon
            icon="radio-outline"
            color="#0c9463"
            style={{ backgroundColor: '#0c946350' }}
          />
        </Neomorph>
        <Caption>Radio</Caption>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 26,
    marginBottom: 12,
    marginHorizontal: 16
  },
  shortcutContainer: { justifyContent: 'center', alignItems: 'center' }
});