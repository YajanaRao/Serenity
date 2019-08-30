import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  withTheme,
  Subheading,
  Title,
  Colors,
  TouchableRipple,
  Divider,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {isEmpty, isEqual} from 'lodash';

import Genre from '../../data/genre.json';
import Header from '../../components/Header';
import Track from '../../components/Track';

class Search extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: <Header />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
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
    const {colors} = this.props.theme;
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
        {isEmpty(this.state.searchResult) ? (
          false
        ) : (
          <View style={{height: '100%'}}>
            <FlatList
              data={this.props.searchResult}
              ItemSeparatorComponent={() => <Divider inset={true} />}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Track track={item} />}
            />
          </View>
        )}

        <Title style={styles.headline}>All Moods & Geners</Title>
        <View style={styles.container}>
          <FlatList
            data={Genre}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flex: 1
                }}
                onPress={() =>
                  navigate('Filter', {
                    songs: [],
                    img: item.image,
                    title: item.title,
                  })
                }>
                <LinearGradient
                  colors={item.colors}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.item}>
                  <Subheading style={{color: 'white'}} numberOfLines={1}>
                    {item.title}
                  </Subheading>

                  {/* <Subheading style={{color: 'white'}} numberOfLines={1}>
                      {item.title}
                    </Subheading> */}
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.query.searchResult,
});

export default connect(mapStateToProps)(withTheme(Search));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
  },
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
