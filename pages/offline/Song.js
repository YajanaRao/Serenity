import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, RefreshControl } from 'react-native';
import _ from 'lodash';
import { RNAndroidAudioStore } from "react-native-get-music-files";

import { addToQueue, getOfflineSongs } from '../../actions';
import Track from '../../components/Track'




class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            refreshing: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.files, state.files)) {
            return {
                files: props.files,
                refreshing: false
            }
        }
        return null
    }

    fetchData = () => {
        this.setState({
            refreshing: true
        })
        this.props.getOfflineSongs();
    }

    componentDidMount(){
        this.props.getOfflineSongs();
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


export default connect(mapStateToProps, { addToQueue, getOfflineSongs })(withTheme(Song));