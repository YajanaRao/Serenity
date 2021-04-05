import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Divider, Text } from 'react-native-paper';
import { NavigationState } from '@react-navigation/core';
import { PlayerBarContainer } from '../containers/PlayerBarContainer';

interface BottomTabBarProps {
  navigation: any;
  descriptors: any;
  state: NavigationState;
  backgroundColor: string;
}

export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
  backgroundColor,
}: BottomTabBarProps) => {
  console.log();
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const { routes, index } = state;
  return (
    <View style={{ elevation: 4, backgroundColor }}>
      <PlayerBarContainer />
      <Divider />
      <View style={[styles.container]}>
        {routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableRipple
              key={route.key}
              style={styles.tabButton}
              // rippleColor={colors.primary}
              // underlayColor={colors.primary}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {options.tabBarIcon({ focused: isFocused })}
                <Text
                  style={{
                    includeFontPadding: false,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 10,
                    letterSpacing: 0.4,
                    marginBottom: 4,
                    padding: 0,
                    fontFamily: isFocused ? 'Nunito-Bold' : 'Nunito',
                  }}
                >
                  {label}
                </Text>
              </View>
            </TouchableRipple>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
});
