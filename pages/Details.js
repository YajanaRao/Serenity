import React from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

class DetailScreen extends React.PureComponent {
  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ backgroundColor: colors.background }}>
        <Text>Hello world</Text>
      </View>
    );
  }
}

export default withTheme(DetailScreen);