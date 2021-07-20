import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  useTheme,
  IconButton
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '@serenity/components';
// import { changeRadioMode } from '../../actions';
import { clearHistory, updateTheme } from '@serenity/core';
import { AlertDialog } from '~/components/Dialogs/AlertDialog';
import { DiagnoseDialog } from './components/DiagnoseDialog';

export const SettingScreen = () => {
  const dispatch = useDispatch();
  // const { googleAccessGiven, user } = useSelector(state => state.ui);

  const [visible, setVisible] = useState('');
  const radio = useSelector((state: any) => state.config.radio);
  const theme = useTheme();
  const { dark } = theme;

  const toggleTheme = (isDark: boolean) => {
    let themeType = 'dark';
    if (isDark) {
      themeType = 'default';
    }
    dispatch(updateTheme(themeType));
  };

  const toggleRadioMode = () => {
    // dispatch(changeRadioMode(!radio));
  };

  const showAlert = () => {
    setVisible('ALERT');
  };

  const clearData = () => {
    dispatch(clearHistory());
    setVisible('');
  };

  return (
    <Screen>
      <AlertDialog
        visible={visible === 'ALERT'}
        title="Clear History"
        message="Do you want to clear all your songs history ?"
        action={clearData}
        hideDialog={() => setVisible('')}
      />
      <DiagnoseDialog
        visible={visible === 'DIAGNOSE'}
        hideDialog={() => setVisible('')}
      />
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
          <Drawer.Item
            onPress={() => setVisible('DIAGNOSE')}
            label="Diagnostics"
            icon="alert-circle-outline"
          />
          <Drawer.Item
            onPress={showAlert}
            label="Clear history"
            icon="trash-outline"
          />
        </Drawer.Section>
        <Drawer.Section title="Social">
          <IconButton icon="telegram" />
          <Drawer.Item
            onPress={() => setVisible('DIAGNOSE')}
            label="Diagnostics"
            icon="alert-circle-outline"
          />
          <Drawer.Item
            onPress={showAlert}
            label="Clear history"
            icon="trash-outline"
          />
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
