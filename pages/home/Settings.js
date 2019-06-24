import React from 'react';
import { View } from 'react-native';
import { withTheme, Text } from 'react-native-paper';

class DetailScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Settings',
    }

  };
  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <Text>Hello world</Text>
      </View>
    );
  }
}

export default withTheme(DetailScreen);