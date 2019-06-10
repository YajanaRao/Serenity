import React from 'react';
import { NavigationActions, withNavigation } from 'react-navigation';
import {ScrollView,  View, StyleSheet, Platform} from 'react-native';
import {  Drawer, withTheme, Switch, TouchableRipple, Text } from 'react-native-paper';


const DrawerItemsData = [
  { label: 'Home', icon: 'home', key: 'Home' },
  { label: 'Details', icon: 'settings', key: 'Details' },
  { label: 'Profile', icon: 'account-circle', key: 'Profile' },
];

class SideMenu extends React.PureComponent {
  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  state = {
    active: 'Home',
  };

  _setDrawerItem = index => {
    // console.log("drawer index",index);
    this.navigateToScreen(index);
    this.setState({ active: index });
  }

  render () {
    const { colors } = this.props.theme;
    const { active } = this.state;

    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView>
         <Drawer.Section title="Navigate">
          {DrawerItemsData.map((props) => (
            <Drawer.Item
              {...props}
              key={props.key}
              active={active === props.key}
              onPress={() => this._setDrawerItem(props.key)}
            />
          ))}
        </Drawer.Section>
        
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => this.props.toggleTheme()}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={this.props.isDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Yajana N Rao</Text>
        </View>
      </View>
    );
  }
}


export default withNavigation(withTheme(SideMenu));


const styles = StyleSheet.create({
   container: {
    paddingTop: Platform.OS === 'android' ? 25 : 22,
    flex: 1
  },
  footerContainer: {
    padding: 20,
    textAlign: 'center'
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
