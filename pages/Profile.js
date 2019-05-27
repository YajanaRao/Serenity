import * as React from 'react';
import { View } from 'react-native';
import {
  withTheme,
} from 'react-native-paper';

import NavBar from '../components/NavBar';
import Dashboard from './Dashboard';

class ProfileScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: background }}>
        <NavBar />
        <Dashboard />
      </View>
    );
  }
}

export default withTheme(ProfileScreen);