import { FlatList } from 'react-native-gesture-handler';
import SwiperContainer from '../../containers/SwiperContainer';
import * as React from 'react';
import { withTheme,  ProgressBar, Colors, Headline, Button } from 'react-native-paper';
import { playMedia } from '../../actions';
import { connect } from 'react-redux';

import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';


class MusicScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componnentDidMount() {
    console.log("album",album)
  }


  render() {
    const { navigation } = this.props;

    const { colors } = this.props.theme;

    const album = navigation.getParam('albumId', null);


    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <ProgressBar progress={0.5} color={Colors.red800} style={{ width: '90%'}} />
          <Headline>We will be coming soon</Headline>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Back
        </Button>
        </View>
      </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icons: {
        width: Dimensions.get('window').width / 6,
    },
});


export default connect(null, { playMedia })(withTheme(MusicScreen));