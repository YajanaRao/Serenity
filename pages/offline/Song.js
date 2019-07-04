import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, RefreshControl } from 'react-native';
import _ from 'lodash';
import { RNAndroidAudioStore } from "react-native-get-music-files";
import { addToQueue } from '../../actions';

import Track from '../../components/Track'




class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            refreshing: false
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (!_.isEmpty(nextProps.files)) {
    //         this.setState({
    //             files: nextProps.files,
    //             refreshing: false
    //         });
    //     }   
    // }

    fetchData = () => {
        this.setState({
            refreshing: true
        })
        this.getOfflineSongs();
    }

    getOfflineSongs = () => {
        RNAndroidAudioStore.getAll({})
            .then(media => {
                _.map(media, function (item) {
                    item.url = "file://" + item.path

                    if (!item.id) {
                        item.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    }
                    delete item.path
                    item.artwork = 'https://source.unsplash.com/collection/574198/120x120'
                    return item
                });
                this.setState({ 
                    files: media,
                    refreshing: false
                });
            })
            .catch(er => alert(JSON.stringify(error)));
    }

    componentDidMount(){
        this.getOfflineSongs();
    }

    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props;
        

        if(!_.isEmpty(this.state.files)){
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                   <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
                        <Button icon="play-circle-outline" mode="text" onPress={() => this.props.addToQueue(this.state.files)}>
                            Play All
                        </Button>
                        {/* <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(this.state.files)}>
                            Shuffle
                        </Button> */}
                    </View>
                    <Divider/>
                    <FlatList
                        data={this.state.files}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.fetchData()}
                            />
                        }
                        
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Track track={item} />
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

const mapStateToProps = state => ({
    files: state.media.files
});


export default connect(mapStateToProps, { addToQueue })(withTheme(Song));