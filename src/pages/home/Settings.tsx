import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { Screen } from '../../components/Screen';
import { updateTheme, changeRadioMode } from '../../actions';
import { clearHistory } from '../../actions/playerState';

export const SettingScreen = () => {
  const dispatch = useDispatch();
  const radio = useSelector((state: any) => state.config.radio);
  const theme = useTheme();
  const { dark } = theme;

  const toggleTheme = (dark: boolean) => {
    let theme = 'default';
    if (dark) {
      theme = 'dark';
    }
    dispatch(updateTheme(theme));
  };

  const toggleRadioMode = () => {
    dispatch(changeRadioMode(!radio));
  };

  function clearData() {
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
          <TouchableRipple onPress={clearData}>
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
};

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
