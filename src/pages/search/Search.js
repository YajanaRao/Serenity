import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Subheading, Title, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { FlatList } from 'react-navigation';
import Genre from '../../data/genre.json';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import TrackContainer from '../../containers/TrackContainer';

class Search extends Component {
  static navigationOptions = () => {
    return {
      header: <Header />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      searchResult: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.searchResult, state.searchResult)) {
      return {
        searchResult: props.searchResult,
      };
    }
    return null;
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { searchResult } = this.state;
    return (
      <Screen>
        {searchResult ? (
          <FlatList
            data={searchResult}
            key={searchResult.length}
            ItemSeparatorComponent={() => <Divider inset />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackContainer track={item} />}
          />
        ) : (
          <FlatList
            key="Genre"
            data={Genre}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            ListHeaderComponent={() => (
              <Title style={styles.headline}>All Moods & Genres</Title>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() =>
                  navigate('Filter', {
                    songs: [],
                    img: item.image,
                    title: item.title,
                  })
                }
              >
                <LinearGradient
                  colors={item.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.item}
                >
                  <Subheading style={{ color: 'white' }} numberOfLines={1}>
                    {item.title}
                  </Subheading>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.query.searchResult,
});

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  searchbar: {
    margin: 10,
  },
  item: {
    // backgroundColor: Colors.lightBlueA100,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 4,
    elevation: 8,
  },
  headline: {
    textAlign: 'center',
  },
});
