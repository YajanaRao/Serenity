import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  withTheme,
  Caption,
  TouchableRipple,
  Surface,
  Divider,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import PlayerBarContainer from '../containers/PlayerBarContainer';

// https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496
// activeColor: '#f0edf6',
//  inactiveColor: '#3e2465',

const BottomTabBar = props => {
  const {
    renderIcon,
    getLabelText,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {colors} = props.theme;

  const {routes, index: activeRouteIndex} = navigation.state;
  return (
    <Surface style={{elevation: 4}}>
      <PlayerBarContainer />
      <Divider />
      <Surface style={[styles.container, {backgroundColor: colors.Surface}]}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? colors.primary : colors.text;
          return (
            <TouchableRipple
              key={routeIndex}
              style={styles.tabButton}
              rippleColor={colors.primary}
              underlayColor={colors.primary}
              borderless={true}
              onPress={() => {
                onTabPress({route});
              }}
              onLongPress={() => {
                onTabLongPress({route});
              }}
              accessibilityLabel={getAccessibilityLabel({route})}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {renderIcon({route, focused: isRouteActive, tintColor})}

                <Caption
                  style={{
                    color: tintColor,
                    textAlign: 'center',
                    fontSize: 10,
                    margin: 0,
                    padding: 0,
                  }}>
                  {getLabelText({route})}
                </Caption>
              </View>
            </TouchableRipple>
          );
        })}
      </Surface>
    </Surface>
  );
};

BottomTabBar.propTypes = {
  renderIcon: PropTypes.func.isRequired,
  getLabelText: PropTypes.func.isRequired,
  onTabPress: PropTypes.func.isRequired,
  onTabLongPress: PropTypes.func.isRequired,
  getAccessibilityLabel: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
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

export default withTheme(BottomTabBar);
