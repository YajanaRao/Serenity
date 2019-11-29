import React from 'react';
import { Button, withTheme, Theme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Tree from './Tree';

interface Props {
  theme: Theme;
  text: string;
  fetchData(): void;
}

const Blank = ({ theme, text, fetchData }: Props) => {
  const { colors } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tree message={text} />
      <View style={styles.padding}>
        <Button icon="refresh" mode="text" onPress={fetchData}>
          Refresh
        </Button>
      </View>
    </View>
  );
};

export default withTheme(Blank);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    margin: 4,
  },
});
