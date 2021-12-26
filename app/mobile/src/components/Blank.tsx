import React from 'react';
import { useTheme } from 'react-native-paper';
import { Button } from '@serenity/components';
import { StyleSheet, View } from 'react-native';
import Tree from './Tree';

interface Props {
  text: string;
  buttonText?: string;
  fetchData(): void;
}

export const Blank = ({ text, fetchData, buttonText = 'Refresh' }: Props) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tree message={text} />
      <View style={styles.padding}>
        <Button onPress={fetchData}>
          {buttonText}
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
