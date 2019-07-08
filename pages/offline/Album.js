import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Title, List, Colors } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'; 
import _ from 'lodash';
import { RNAndroidAudioStore } from "react-native-get-music-files";

class Album extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            albums: []        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (!_.isEmpty(nextProps.files)) {
    //         this.setState({ files: nextProps.files });
    //     }
    // }

    componentDidMount() {
        // this.props.getOfflineMedia()
        RNAndroidAudioStore.getAlbums({})
            .then(media => {
                this.setState({ albums: media });
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

        // const albums = _.uniqBy(this.state.files, 'album');

        if (!_.isEmpty(this.state.albums)) {
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                    <FlatList
                        data={this.state.albums}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        // onRefresh={() => this.props.getOfflineMedia()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <List.Item
                                title={item.album}
                                left={props =>  item.cover == 'null' ? 
                                    <FastImage {...props} source={ require('../../assets/app-icon.png') } style={styles.icons} /> : 
                                    <FastImage {...props} source={{ uri: "file://"+ item.cover }} style={styles.icons} />  
                                }
                                description={ item.numberOfSongs + " songs"}
                                onPress={() => {
                                    if (item.cover == 'null') {
                                        navigate('Filter', {
                                            album: item.album, title: item.album
                                        })
                                    }else {
                                        navigate('Filter', {
                                            album: item.album, img: "file://" + item.cover, title: item.album
                                        })
                                    }
                                   }}
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

// const mapStateToProps = state => ({
//     files: state.media.files
// });


// export default connect(mapStateToProps)(withTheme(Album));
export default withTheme(Album);

const styles = StyleSheet.create({
    icons: {
        width: 50,
        borderRadius: 4,
        backgroundColor: Colors.blue500
    },
});