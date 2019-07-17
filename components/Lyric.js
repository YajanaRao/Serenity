import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Dialog, Portal, IconButton, Divider, Text, Paragraph, Button } from 'react-native-paper';
import _ from 'lodash';

import { getLyrics } from '../utils';

class Lyric extends Component {
    state = {
        visible: false,
        track: {}
    };

    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.track, state.track)) {
            if (props.track) {
                return {
                    track: props.track
                }
            }
        }
        return null
    }

    componentDidMount(){
        // getLyrics(this.state.track).then((lyrics) => {
        //     console.log(lyrics)
        // })
    }

    _showDialog = () => {
        console.log("clicked on lyric")
        this.setState({ visible: true });
    }

    _hideDialog = () => this.setState({ visible: false });

    render() {
        return (
            <View style={this.props.style}>
                <IconButton
                    icon="subtitles"
                    onPress={this._showDialog}
                />
                <Portal style={{ zIndex: 200 }}>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Lyrics</Dialog.Title>
                        <Divider/>
                        <Dialog.Content>
                            <Paragraph>Lyric feature is comming to the application</Paragraph>
                            <Dialog.ScrollArea>
                                <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                                    <Text>This is a scrollable area</Text>
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