import * as React from 'react';
import { withTheme, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import NetNotify from '../../components/NetNotify';
import RecentContainer from '../../containers/RecentContainer';
import OnlineContainer from '../../containers/OnlineContainer';
import { ScrollView } from 'react-navigation';

class MainScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerRight: (
        <IconButton
          icon="settings"
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    };
  };

  state = {
    isLoaded: false
  }

  componentDidMount() {
    if (!this.state.isLoaded) {

    }
  }

  render() {
    const { colors } = this.props.theme;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View>
          <NetNotify />
          <RecentContainer />
          <OnlineContainer />
        </View>
      </ScrollView>
    );
  }
}

MainScreen.propTypes = {
  theme: PropTypes.object.isRequired
}

export default withTheme(MainScreen);
