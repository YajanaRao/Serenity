import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  useTheme,
  List,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from '../../components/Screen';
import { updateTheme, changeRadioMode } from '../../actions';
import { clearHistory } from '../../actions/playerState';
import { AlertDialog } from '../../components/AlertDialog';
import { removeUserInfo } from '../../actions/userState';
import { log } from '../../utils/logging';

export const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { skipLoginState, user } = useSelector(state => state.user);

  const [visible, setVisible] = useState(false);
  const radio = useSelector((state: any) => state.config.radio);
  const theme = useTheme();
  const { dark } = theme;

  const toggleTheme = (isDark: boolean) => {
    let themeType = 'default';
    if (isDark) {
      themeType = 'dark';
    }
    dispatch(updateTheme(themeType));
  };

  const toggleRadioMode = () => {
    dispatch(changeRadioMode(!radio));
  };

  const showAlert = () => {
    setVisible(true);
  };

  const signOut = async () => {
    try {
      setLoading(true);
      GoogleSignin.configure();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('@token');
      dispatch(removeUserInfo());
      setLoading(false);
      navigation.navigate('App');
    } catch (error) {
      log(error);
      navigation.navigate('App');
    }
  };

  const signIn = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      navigation.navigate('Auth');
    } catch (error) {
      console.error(error);
    }
  };
  const clearData = () => {
    dispatch(clearHistory());
    setVisible(false);
  };

  return (
    <Screen>
      <AlertDialog
        visible={visible}
        title="Clear History"
        message="Do you want to clear your history ?"
        action={clearData}
        hideDialog={() => setVisible(false)}
      />
      <ScrollView>
        {user !== {} ||
          (user !== null && (
            <List.Item
              title={user.user.name}
              description={user.user.email}
              left={props =>
                user.user.photo ? (
                  <Avatar.Image {...props} source={{ uri: user.user.photo }} />
                ) : (
                  <List.Icon {...props} icon="person-outline" />
                )
              }
            />
          ))}
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
            onPress={showAlert}
            label="Clear history"
            icon="trash-outline"
          />
          {skipLoginState || !user ? (
            <Drawer.Item
              onPress={signIn}
              active
              label="Login"
              icon="log-in-outline"
            />
          ) : (
            <Drawer.Item
              onPress={signOut}
              label="Logout"
              active={loading}
              icon="log-out-outline"
            />
          )}
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
