import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,  View, StyleSheet, Platform} from 'react-native';
import type { Theme } from 'react-native-paper/types';
import {
  Drawer,
  withTheme,
  Switch,
  TouchableRipple,
  Text,
  Colors,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { updateTheme } from '../actions';


const DrawerItemsData = [
  { label: 'Inbox', icon: 'inbox', key: 'Home' },
  { label: 'Starred', icon: 'star', key: 'Details' },
  { label: 'Colored label', icon: 'color-lens', key: 'Profile' },
];

class SideMenu extends Component {
  navigateToScreen = (route) => {
    console.log("routing",route);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  state = {
    active: 'Home',
  };

  _setDrawerItem = index => {
    console.log("drawer index",index);
    this.navigateToScreen(index);
    this.setState({ active: index });
  }

  render () {
    const { colors } = this.props.theme;
    const { active } = this.state;
    const { themeType } = this.props.themeType;
    console.log("theme type in sidebar",themeType)
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView>
         <Drawer.Section title="Navigate">
          {DrawerItemsData.map((props) => (
            <Drawer.Item
              {...props}
              key={props.key}
              active={this.state.active === props.key}
              onPress={() => this._setDrawerItem(props.key)}
            />
          ))}
        </Drawer.Section>
        
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={this.props.updateTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={ themeType == "dark" ? true : false } />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  themeType: state.themeType
});

export default connect(mapStateToProps, { updateTheme })(withTheme(SideMenu));

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
   container: {
    paddingTop: Platform.OS === 'android' ? 25 : 22,
    flex: 1
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
