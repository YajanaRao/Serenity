import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Screen } from '@serenity/components';
import { clearHistory, updateTheme } from '@serenity/core';
import { AlertDialog } from 'components/Dialogs/AlertDialog';
import { DiagnoseDialog } from './DiagnoseDialog';
import Config from 'react-native-config';

export const SettingScreen = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState('');
  const theme = useTheme();
  const { dark } = theme;

  const toggleTheme = (isDark: boolean) => {
    let themeType = 'dark';
    if (isDark) {
      themeType = 'default';
    }
    dispatch(updateTheme(themeType));
  };



  const showAlert = () => {
    setVisible('ALERT');
  };

  const clearData = () => {
    dispatch(clearHistory());
    setVisible('');
  };

  function openSupport() {
    Linking.openURL(Config.TELEGRAM_LINK);
  }

  function openGithub() {
    Linking.openURL("https://github.com/YajanaRao/Serenity");
  }


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
          <Drawer.Item
            onPress={openSupport}
            label="Join our community"
            icon="telegram"
          />
          <Drawer.Item
            onPress={openGithub}
            label="Github"
            icon="github-outline"
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
