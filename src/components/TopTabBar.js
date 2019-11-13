import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  withTheme,
  Paragraph,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import PropTypes from 'prop-types';

// https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496
// activeColor: '#f0edf6',
//  inactiveColor: '#3e2465',

const TopTabBar = ({
  getLabelText,
  onTabPress,
  onTabLongPress,
  getAccessibilityLabel,
  navigation,
  theme,
}) => {
  const { colors } = theme;

  const { routes, index: activeRouteIndex } = navigation.state;
  return (
    <Surface style={[styles.container]}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? colors.primary : colors.text;
        const indicatorStyle = isRouteActive ? colors.primary : colors.surface;
        const label = getLabelText({ route });
        return (
          <TouchableRipple
            key={routeIndex}
            style={[styles.tabButton, { borderBottomColor: indicatorStyle }]}
            rippleColor={colors.primary}
            underlayColor={colors.primary}
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
              <Paragraph
                style={{
                  color: tintColor,
                  textAlign: 'center',
                  //   padding: 12
                }}
              >
                {label.toUpperCase()}
              </Paragraph>
            </View>
          </TouchableRipple>
        );
      })}
    </Surface>
  );
};

TopTabBar.propTypes = {
  getLabelText: PropTypes.func.isRequired,
  onTabPress: PropTypes.func.isRequired,
  onTabLongPress: PropTypes.func.isRequired,
  getAccessibilityLabel: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 4,
    height: 50,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 2,
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
});

export default withTheme(TopTabBar);
