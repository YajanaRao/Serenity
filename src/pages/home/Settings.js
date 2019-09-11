import React from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {
  withTheme,
  Text,
  Switch,
  Drawer,
  TouchableRipple,
} from 'react-native-paper';
import {connect} from 'react-redux';

import {updateTheme} from '../../actions';
import {clearHistory} from '../../actions/playerState';

class Settings extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Settings',
  };

  _toggleTheme = dark => {
    let theme = 'default';
    if (dark) {
      theme = 'dark';
    }
    this.props.updateTheme(theme);
  };

  _clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Do you want to clear your history ?',
      [
        {text: 'Yes', onPress: () => this.props.clearHistory()},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {colors} = this.props.theme;
    const {dark} = this.props.theme;
    return (
      <View style={{backgroundColor: colors.background, flex: 1}}>
        <ScrollView>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => this._toggleTheme(dark)}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section title="Data">
            <TouchableRipple onPress={this._clearHistory}>
              <View style={styles.preference}>
                <Text>Clear history</Text>
                {/* <View pointerEvents="none">
                  <Switch value={dark} />
                </View> */}
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  {updateTheme, clearHistory},
)(withTheme(Settings));

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
