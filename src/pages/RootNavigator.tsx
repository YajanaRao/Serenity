import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { SafeAreaView } from 'react-native';
import { OfflineStack } from './offline';
import { SearchStack } from './search';
import HomeStack from './home';
import IntroductionScreen from './intro/Introduction';
import { ExploreStack } from './explore';
import { BottomTabBar } from '../components/BottomTabBar';
import NotificationContainer from '../containers/NotificationContainer';
import { WelcomeScreen } from './welcome/Welcome';
import { PlayerStack } from './player';
import { FindScreen } from './shared/Find';
import { Header } from '../components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

const BottomNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar {...props} backgroundColor={colors.surface} />
      )}
      tabBarOptions={{
        style: { backgroundColor: colors.surface },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'home' : 'home-outline'}
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'search' : 'search-outline'}
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'compass' : 'compass-outline'}
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'download' : 'download-outline'}
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Find"
        component={FindScreen}
        options={{
          header: ({ navigation }) => <Header goBack={navigation.goBack} />,
        }}
      />
      <Stack.Screen
        name="Player"
        component={PlayerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <NativeStack.Screen name="App" component={RootStack} />
      <NativeStack.Screen name="Intro" component={IntroductionScreen} />
      <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
    </NativeStack.Navigator>
  );
};
export const RootNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <NotificationContainer />
      <AuthStack />
    </SafeAreaView>
  );
};
