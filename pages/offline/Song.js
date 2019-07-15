import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, RefreshControl } from 'react-native';
import _ from 'lodash';

import { getOfflineSongs } from '../../actions/mediaStore';
import { addToQueue } from '../../actions/playerState';
import Track from '../../components/Track'

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            refreshing: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.songs, state.songs)) {
            return {
                songs: props.songs,
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
        

        if(!_.isEmpty(this.state.songs)){
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                   <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
                        <Button icon="play-circle-outline" mode="text" onPress={() => this.props.addToQueue(this.state.songs)}>
                            Play All
                        </Button>
                        {/* <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(this.state.songs)}>
                            Shuffle
                        </Button> */}
                    </View>
                    <Divider/>
                    <FlatList
                        data={this.state.songs}
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
    songs: state.mediaStore.songs
});


export default connect(mapStateToProps, { addToQueue, getOfflineSongs })(withTheme(Song));