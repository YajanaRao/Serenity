import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import { getOfflineMedia, addToQueue } from '../../actions';
import Track from '../../components/Track'
import { PermissionsAndroid } from 'react-native';

class OfflineMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    shouldComponntUpdate(nextProps, nextState) {
        if (this.props.files !== nextProps.files) {
            return true;
        }
        return false;
    }
    
    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Serenity App READ_EXTERNAL_STORAGE Permission',
                    message:
                        'Serenity App needs access to your READ_EXTERNAL_STORAGE ' +
                        'so you can take play offline songs.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the READ_EXTERNAL_STORAGE');
                this.props.getOfflineMedia();
            } else {
                console.log('READ_EXTERNAL_STORAGE permission denied');
            }
        } catch (err) {
            console.warn(err);
        }       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.files) {
            this.setState({ files: nextProps.files });
        }
    }

    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props;
        

        const { files } = this.state;
        if(!_.isEmpty(files)){
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
                        data={files}
                        ItemSeparatorComponent={() => <Divider />}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Track track={item} />
                        }
                    />
                </View>
            );
          }
          return false;
    }
}

const mapStateToProps = state => ({
    files: state.media.files
});


export default connect(mapStateToProps, { getOfflineMedia, addToQueue })(withTheme(OfflineMedia));