import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, TouchableRipple, Surface, Divider } from 'react-native-paper';
import PlayerBarContainer from '../containers/PlayerBarContainer';
import { NavigationState } from '@react-navigation/core';

interface BottomTabBarProps {
  renderIcon(route: NavigationState, focused: boolean): void;
  getLabelText(route: NavigationState): void;
  onTabPress(route: NavigationState): void;
  onTabLongPress(route: NavigationState): void;
  getAccessibilityLabel(route: NavigationState): void;
  state: NavigationState;
}

function BottomTabBar({
  renderIcon,
  getLabelText,
  onTabPress,
  onTabLongPress,
  getAccessibilityLabel,
  state,
}: BottomTabBarProps) {
  const { routes, index } = state;
  return (
    <Surface style={{ elevation: 4 }}>
      <PlayerBarContainer />
      <Divider />
      <Surface style={[styles.container]}>
        {routes.map((route: NavigationState, routeIndex: number) => {
          const isRouteActive = routeIndex === index;
          // const color = isRouteActive ? "green" : "red";
          return (
            <TouchableRipple
              key={route.key}
              style={styles.tabButton}
              // rippleColor={colors.primary}
              // underlayColor={colors.primary}
              borderless
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {renderIcon({ route, focused: isRouteActive })}

                <Caption
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {getLabelText({ route })}
                </Caption>
              </View>
            </TouchableRipple>
          );
        })}
      </Surface>
    </Surface>
  );
}

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

export default BottomTabBar;
