import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Tree } from './Tree';

interface Props {
  text: string;
  fetchData(): void;
}

export const Blank = ({ text, fetchData }: Props) => {
  const theme = useTheme();
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  padding: {
    margin: 4,
  },
});
