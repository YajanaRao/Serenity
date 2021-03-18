import React from 'react';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { PlayerScreen } from './Player';
import { QueueScreen } from './Queue';

const NativeStack = createNativeStackNavigator();

export const PlayerStack = () => {
  const { colors } = useTheme();
  return (
    <NativeStack.Navigator
      initialRouteName="Active"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTopInsetEnabled: false,
      }}
    >
      <NativeStack.Screen
        name="Active"
        component={PlayerScreen}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen name="Queue" component={QueueScreen} />
    </NativeStack.Navigator>
  );
};
