
import * as React from 'react';
import { StyleSheet, FlatList, ImageBackground, Image, Dimensions, View } from 'react-native';
import { Constants } from 'expo';

import {
  Title,
  Caption,
  Paragraph,
  Card,
  Button,
  Surface,
  Text,
  Headline,
  withTheme,
} from 'react-native-paper';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { connect } from 'react-redux';

class DashboardScreen extends React.Component{

   componentWillReceiveProps(nextProps) {   
        if (nextProps.query) {
            console.log("dashboard query", nextProps.query);
            this.setState({
                query: nextProps.query
            })   
        }
    }


  render(){
    
    const PHOTOS = Array.from({ length: 24 }).map(
      (_, i) => `https://unsplash.it/300/300/?random&id=${i}`
    );

    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    const { query } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: background}}>
       <FlatList
          data={ query ? 
            PHOTOS.filter(item => {      
              const itemData = `${item.toUpperCase()}   
              ${item.toUpperCase()} ${item.toUpperCase()}`;

              const textData = query.toUpperCase();
                
              return itemData.indexOf(textData) > -1;    
            }) : PHOTOS
          }
          renderItem={({item}) => <Card style={styles.card}>
              <Card.Cover source={{ uri: item}} />
              <Card.Content>
                <Title>Card title</Title>
                <Paragraph>{item}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => {}}>Share</Button>
                <Button onPress={() => {this.props.navigation.navigate('MyModal',{
                      itemId: 1,
                      img: item,
                    });
                  }}>Explore</Button>
              </Card.Actions>
            </Card>}
          keyExtractor={( item, index) => index.toString()}
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const img = navigation.getParam('img', `https://unsplash.it/${Dimensions.get('window').width}/${Dimensions.get('window').height}/?random&blur`);
    return (
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: background, 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 8 }}>
        <Image source={{ uri: img }} style={styles.img} />
        <Headline>Details Screen</Headline>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}>
          Dismiss
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    query: state.query.query,
})

const RootStack = createStackNavigator(
  {
    Main: {
      screen: connect(mapStateToProps)(withTheme(DashboardScreen)),
    },
    MyModal: {
      screen: withTheme(ModalScreen),
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);


const AppContainer = createAppContainer(RootStack);

class Dashboard extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

export default withTheme(Dashboard);

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
  img: {
    height: Dimensions.get('window').width,
    width: '100%',
  }
});