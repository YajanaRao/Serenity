import * as React from 'react';
import {withTheme, IconButton} from 'react-native-paper';
import {View, ScrollView} from 'react-native';

import NetNotify from '../../components/NetNotify';
import Top20Container from '../../containers/Top20Container';
import ArtistContainer from '../../containers/ArtistContainer';
import RecentContainer from '../../containers/RecentContainer';
import QuoteContainer from '../../containers/QuoteContainer';
import PopularContainer from '../../containers/PopularContainer';
import OnlineContainer from '../../containers/OnlineContainer';

class MainScreen extends React.PureComponent {
  static navigationOptions = ({navigation}) => {
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

  render() {
    const {colors} = this.props.theme;

    return (
      <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
        <View>
          <NetNotify />
          <RecentContainer />
          <OnlineContainer>
            <QuoteContainer />
            <PopularContainer />
            <Top20Container />
            <ArtistContainer />
          </OnlineContainer>
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(MainScreen);
