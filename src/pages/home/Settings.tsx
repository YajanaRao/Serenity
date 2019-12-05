import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  withTheme,
  Theme,
  useTheme,
} from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';

import Screen from '../../components/Screen';
import { updateTheme, changeRadioMode } from '../../actions';
import { clearHistory } from '../../actions/playerState';

interface Props {
  updateTheme(theme: string): void;
  radio: boolean;
  changeRadioMode(radio: boolean): void;
  clearHistory(): void;
  theme: Theme;
}

function Settings() {
  const dispatch = useDispatch();
  const radio = useSelector((state: any) => state.config.radio);
  const theme = useTheme();
  const { dark } = theme;
  function toggleTheme(dark: string) {
    let theme = 'default';
    if (dark) {
      theme = 'dark';
    }
    dispatch(updateTheme(theme));
  }

  function toggleRadioMode() {
    dispatch(changeRadioMode(!radio));
  }

  function clearHistory() {
    Alert.alert(
      'Clear History',
      'Do you want to clear your history ?',
      [
        { text: 'Yes', onPress: () => dispatch(clearHistory()) },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Screen>
      <ScrollView>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => toggleTheme(dark)}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={dark} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={toggleRadioMode}>
            <View style={styles.preference}>
              <Text>Radio Mode</Text>
              <View pointerEvents="none">
                <Switch value={radio} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section title="Data">
          <TouchableRipple onPress={clearHistory}>
            <View style={styles.preference}>
              <Text>Clear history</Text>
              {/* <View pointerEvents="none">
                <Switch value={dark} />
              </View> */}
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </ScrollView>
    </Screen>
  );
}

export default Settings;

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
