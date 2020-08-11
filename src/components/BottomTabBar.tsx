import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, TouchableRipple, Surface, Divider } from 'react-native-paper';
import { PlayerBarContainer } from '../containers/PlayerBarContainer';
import { NavigationState } from '@react-navigation/core';

interface BottomTabBarProps {
  navigation: any;
  descriptors: any;
  state: NavigationState;
}

export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const { routes, index } = state;
  // const theme = useTheme()
  // const { colors } = theme;
  return (
    <Surface style={{ elevation: 4 }}>
      <PlayerBarContainer />
      <Divider />
      <Surface style={[styles.container]}>
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
            console.log('on press');
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
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {options.tabBarIcon({ isFocused })}
                <Caption
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {label}
                </Caption>
              </View>
            </TouchableRipple>
          );
        })}
      </Surface>
    </Surface>
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
