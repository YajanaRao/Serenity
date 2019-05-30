
import * as React from 'react';
import { StyleSheet, FlatList, ImageBackground, View, ScrollView } from 'react-native';
import Media from '../data/media.json';

import {
  Title,
  Caption,
  Paragraph,
  Card,
  Button,
  List,
  Text,
  Headline,
  withTheme,
} from 'react-native-paper';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

class DashboardScreen extends React.Component {
  state = {
    query: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      // console.log("dashboard query", nextProps.query);
      this.setState({
        query: nextProps.query
      })
    }
  }

  

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    const { query } = this.props;



    return (
      <ScrollView style={{ flex: 1, backgroundColor: background }}>
        <FlatList
          data={query ?
            Media.filter(item => {
              const itemData = `${item.album.toUpperCase()}   
              ${item.album.toUpperCase()} ${item.album.toUpperCase()}`;

              const textData = query.toUpperCase();

              return itemData.indexOf(textData) > -1;
            }) : Media
          }
          renderItem={({ item }) => <Card style={styles.card}>
            {/* <Card.Cover source={{ uri: item.img }} /> */}
            <FastImage source={{ uri: item.img }} />
            <Card.Content>
              <Title>{item.album}</Title>
              <Paragraph>{item.artist}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => { }}>Share</Button>
              <Button onPress={() => {
                this.props.navigation.navigate('MyModal', {
                  item: item
                });
              }}>Explore</Button>
            </Card.Actions>
          </Card>}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
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
    const item = navigation.getParam('item', 'NO-ID');

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: background,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8
        }}>
        <FastImage source={{ uri: item.img }} style={styles.img} />
        <Headline>Details Screen</Headline>
        <Text>{item.artist}</Text>
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
    headerMode: 'none',
  },
);


const AppContainer = createAppContainer(RootStack);

class Dashboard extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default withTheme(Dashboard);

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
  img: {
    height: '100%',
    width: '100%',
  }
});