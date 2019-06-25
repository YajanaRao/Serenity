import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import { addToQueue } from '../../actions';
import Track from '../../components/Track'




class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.files)) {
            console.log("songs", nextProps.files)
            this.setState({ files: nextProps.files });
        }   
    }

    // componentDidMount(){
    //     console.log("calling get offline media")
    //     this.props.getOfflineMedia()
    // }

    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props;
        

        if(!_.isEmpty(this.state.files)){
            console.log("state", this.state.files)
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                   <View style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10, flexDirection: 'row' }}>
                        <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(files)}>
                            Play All
                        </Button>
                        <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(files)}>
                            Shuffle
                        </Button>
                    </View>
                    <FlatList
                        data={this.state.files}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        // onRefresh={() => this.props.getOfflineMedia()}
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