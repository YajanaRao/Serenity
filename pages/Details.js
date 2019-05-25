import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { List, Button, Surface, Text, Card, Title, Caption, Paragraph, Headline } from 'react-native-paper';
import { ScrollView, FlatList,  View, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import HorizontalScrollViewContainer from '../containers/HorizontalScrollViewContainer';

class MusicGallery extends React.Component {
  render(){
    const PHOTOS = Array.from({ length: 24 }).map(
        (_, i) => `https://unsplash.it/300/300/?random&id=${i}`
    );
    return (
      <Surface style={styles.container}>
        <FlatList
          data={PHOTOS}
          renderItem={({ item }) =>
            <List.Item
                key={item}
                title="First Song"
                description={item}
                left={props => <Image source={{ uri: item }} style={styles.icons} /> }
                onPress={() => {this.props.navigation.navigate('MyModal',{
                    itemId: 1,
                    img: item,
                  });
                }}
            />}
          keyExtractor={(item, index) => index.toString()}
        />
      </Surface>
    );
  }
} 


const RecentsRoute = () => {
  const PHOTOS = Array.from({ length: 24 }).map(
    (_, i) => `https://unsplash.it/300/300/?random&id=${i}`
  );

  return (
    <ScrollView>
     <Headline style={styles.headline}>Headline</Headline>
      <HorizontalScrollViewContainer 
      children={
        PHOTOS.map(uri => (
          <View key={uri} style={{ alignItems: 'center' }}>
            <Card style={styles.card}>
              <Card.Cover source={{ uri: uri }} />
            </Card>
            <Paragraph>Abandoned Ship</Paragraph>
          </View>
        ))
      } 
      />
      <Headline style={styles.headline}>Headline</Headline>
      <HorizontalScrollViewContainer
        children={
          PHOTOS.map(uri => (
            <View key={uri} style={{ alignItems: 'center' }}>
              <Card style={styles.card}>
                <Card.Cover source={{ uri: uri }} />
              </Card>
              <Paragraph>Abandoned Ship</Paragraph>
            </View>
          ))
        }
      />
    </ScrollView>
  );
} 


const AlbumGallery = ({ route }) => {
  const PHOTOS = Array.from({ length: 24 }).map(
    (_, i) => `https://unsplash.it/300/300/?random&__id=${route.key}${i}`
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {PHOTOS.map(uri => (
        <View key={uri} style={styles.item} key={uri}>
          <Image source={{ uri }} style={styles.photo} />
        </View>
      ))}
    </ScrollView>
  );
};

class ModalScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const img = navigation.getParam('img', `https://unsplash.it/${Dimensions.get('window').width}/${Dimensions.get('window').height}/?random&blur`);
    console.log(img);
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

export default class DetailScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: MusicScreen,
    albums: AlbumGallery,
    recents: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}



const RootStack = createStackNavigator(
  {
    Main: {
      screen: MusicGallery,
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


const AppContainer =  createAppContainer(RootStack);

class MusicScreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  card: {
    width: 150,
    height: 150,
    margin: 4,
  },
  headline: {
    textAlign: 'center'
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  icons:{
    width: '25%'
  },
    modalContainer: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
  }
});
