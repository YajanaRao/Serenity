import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  withTheme,
  Avatar,
  List,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

class Artist extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
    };
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/ju7jj3uttzw1vow/artist.json?dl=0',
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            data: responseJson,
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            visible: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  render() {
    const {navigate} = this.props.navigation;
    const {colors} = this.props.theme;
    return (
      <View style={{backgroundColor: colors.background, flex: 1}}>
        <List.Item
          title="Add artist"
          left={props => (
            <Avatar.Icon
              {...props}
              style={{backgroundColor: colors.surface}}
              icon="add"
            />
          )}
          onPress={this._showDialog}
        />
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.ScrollArea>
              {this.state.data.length ? (
                <FlatList
                  data={this.state.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <List.Item
                      title={item.artist}
                      left={props => (
                        <FastImage
                          {...props}
                          source={{uri: item.artwork}}
                          style={styles.icons}
                        />
                      )}
                      onPress={() =>
                        navigate('Songs', {
                          songs: item.songs,
                          img: item.artwork,
                          title: item.album,
                        })
                      }
                    />
                  )}
                />
              ) : (
                <View style={{margin: 16}}>
                  <ActivityIndicator size="large" />
                </View>
              )}
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
export default withTheme(Artist);

Artist.propTypes = {
  theme: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  icons: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
