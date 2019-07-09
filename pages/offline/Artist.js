import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Title, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { RNAndroidAudioStore } from "react-native-get-music-files";

class Artist extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        }
    }


    componentDidMount() {
        // this.props.getOfflineMedia()
        RNAndroidAudioStore.getArtists({})
            .then(media => {
                this.setState({ artists: media });
            })
        .catch(er => alert(JSON.stringify(error)));
    }


    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        const { navigate } = this.props.navigation;

        // const artists = _.uniqBy(this.state.files, 'artist');

        if (!_.isEmpty(this.state.artists)) {
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                    <FlatList
                        // data={_.remove(this.state.files, function(n){
                        //     return n.artist != null
                        // })}
                        data={this.state.artists}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        // onRefresh={() => this.props.getOfflineMedia()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <List.Item
                                title={item.artist}
                                description={item.numberOfSongs + " Songs"}
                                left={props => <FastImage {...props} source={ require('../../assets/app-icon.png')} style={styles.icons} />}
                                onPress={() => navigate('Filter', {
                                    artist: item.artist, title: item.artist
                                })}
                            /> 
                        }
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: background, justifyContent: 'center', alignItems: 'center' }}>
                <Title>No offline songs found..</Title>
            </View>
        );
    }
}



export default withTheme(Artist);
// export default withTheme(Artist);

const styles = StyleSheet.create({
    icons: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});