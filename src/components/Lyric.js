import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Dialog,
  Portal,
  IconButton,
  Divider,
  Text,
  Paragraph,
  Button,
} from 'react-native-paper';

import {getLyrics} from '../utils';

class Lyric extends Component {
  state = {
    visible: false,
    lyrics: '',
  };

  componentDidMount() {
    getLyrics(this.props.track).then(lyrics => {
      console.log(lyrics);
      this.setState({
        lyrics: lyrics,
      });
    });
  }

  _showDialog = () => {
    this.setState({visible: true});
  };

  _hideDialog = () => this.setState({visible: false});

  render() {
    return (
      <View style={this.props.style}>
        <IconButton icon="subtitles" onPress={this._showDialog} />
        <Portal style={{zIndex: 200}}>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>Lyrics</Dialog.Title>
            <Divider />
            <Dialog.Content>
              <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
                  <Paragraph>
                    Lyric feature is coming to the application. There will be
                    some long texts here
                  </Paragraph>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

export default Lyric;
