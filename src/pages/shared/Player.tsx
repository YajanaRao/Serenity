import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';

import QueueContainer from '../../containers/QueueContainer';
import { FavContainer } from '../../containers/FavContainer';
import RepeatContainer from '../../containers/RepeatContainer';
import PlayerController from '../../containers/PlayerController';
import { Progress } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { ActiveTrackDetails } from '../../containers/ActiveTrackDetails';

interface PlayerProps {
  navigation: any;
}

class Player extends React.PureComponent<PlayerProps> {
  close = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <Screen>
        <ScrollView>
          <View style={styles.playerContainer}>
            <View style={styles.container}>
              <IconButton icon="close" onPress={this.close} />
              {/* <IconButton
                          icon="more-vert"
                          onPress={() => this.props.navigation.goBack()}
                      /> */}
            </View>
            <ActiveTrackDetails />
            <View style={styles.centerContainer}>
              <Progress />
            </View>
            <View style={styles.playerToolbox}>
              <FavContainer type="song" />
              <PlayerController />
              <RepeatContainer />
            </View>
          </View>
          <Divider />

          <QueueContainer close={this.close} />
          <View style={{ height: 100 }} />
        </ScrollView>
      </Screen>
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  playerContainer: {
    height: Dimensions.get('window').height - 50,
    justifyContent: 'space-between',
  },
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 12,
  },
});
