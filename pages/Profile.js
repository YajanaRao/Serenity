import * as React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View, StyleSheet, ImageBackground, Dimensions, Image, Animated } from 'react-native';
import Dashboard from './Dashboard'
import { withTheme, Text, Surface, Divider, List, Snackbar, Button } from 'react-native-paper';
import NavBar from '../components/NavBar';
import { FlatList } from 'react-native-gesture-handler';
import SwiperContainer from '../components/SwiperContainer';

const Row = ({ item, navigation }) => (
  <Surface style={{ padding: 4 }}>
    <List.Item
        title="First Song"
        description={item}
        left={props => <Image source={{ uri: item }} style={styles.icons} /> }
        onPress={() => {navigation.navigate('MyModal',{
            itemId: 1,
            img: item,
          });
        }}
    />
  </Surface>
);


class MusicGallery extends React.Component {
  state = {
    photos: null,
    visible: false,
  };
  componentDidMount = () => {
    const PHOTOS = Array.from({ length: 24 }).map(
        (_, i) => `https://unsplash.it/300/300/?random&id=${i}`
    );
    this.setState({
      photos: PHOTOS,
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.photos}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => 
            <SwiperContainer>
              <Row item={item} navigation={this.props.navigation} />
            </SwiperContainer>
          }
        />
        <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            action={{
              label: 'Undo',
              onPress: () => {
                this.close()
              },
            }}
          >
          List item Deleted.
        </Snackbar>
      </View>
    );
  }
} 
 
class HomeScreen extends React.Component {

  render() {
    return (
      <Surface style={styles.container}>
         <MusicGallery navigation={this.props.navigation}/>
        <Button
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Dashboard');
          }}
        >Go to Dashboard</Button>
      </Surface>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const img = navigation.getParam('img', `https://unsplash.it/${Dimensions.get('window').width}/${Dimensions.get('window').height}/?random&blur`);
    return (
      <Surface>
        <ImageBackground
          blurRadius={1} 
          source={{uri: img }} 
          style={styles.modalContainer}>
          <Image source={{ uri: img }} style={styles.img} />
          <Text>Details Screen</Text>
          <Text>itemId: {JSON.stringify(itemId)}</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}>
            Dismiss
          </Button>
        </ImageBackground>
      </Surface>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Dashboard: {
      screen: Dashboard,
    },
  },
   {
    mode: 'modal',
    headerMode: 'none',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


const AppContainer = createAppContainer(RootStack);

class ProfileScreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  modalContainer: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons:{
    width: Dimensions.get('window').width / 4,
  },
  img: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
  }
});

export default withTheme(ProfileScreen);