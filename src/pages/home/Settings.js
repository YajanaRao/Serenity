import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';
import { connect } from 'react-redux';

import Screen from '../../components/Screen';
import { updateTheme, changeRadioMode } from '../../actions';
import { clearHistory } from '../../actions/playerState';

class Settings extends React.PureComponent {
  toggleTheme = dark => {
    const { updateTheme } = this.props;
    let theme = 'default';
    if (dark) {
      theme = 'dark';
    }
    updateTheme(theme);
  };

  toggleRadioMode = () => {
    const { radio, changeRadioMode } = this.props;
    changeRadioMode(!radio);
  };

  clearHistory = () => {
    const { clearHistory } = this.props;
    Alert.alert(
      'Clear History',
      'Do you want to clear your history ?',
      [
        { text: 'Yes', onPress: () => clearHistory() },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  static navigationOptions = {
    headerTitle: 'Settings',
  };

  render() {
    const {
      theme: { dark },
      radio,
    } = this.props;
    return (
      <Screen>
        <ScrollView>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => this.toggleTheme(dark)}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={dark} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={this.toggleRadioMode}>
              <View style={styles.preference}>
                <Text>Radio Mode</Text>
                <View pointerEvents="none">
                  <Switch value={radio} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section title="Data">
            <TouchableRipple onPress={this.clearHistory}>
              <View style={styles.preference}>
                <Text>Clear history</Text>
                {/* <View pointerEvents="none">
                  <Switch value={dark} />
                </View> */}
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </ScrollView>
      </Screen>
    );
  }
}

Settings.propTypes = {
  clearHistory: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
  changeRadioMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  radio: state.config.radio,
});

export default connect(
  mapStateToProps,
  { updateTheme, clearHistory, changeRadioMode },
)(withTheme(Settings));

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
