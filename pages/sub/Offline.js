import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { getOfflineMedia } from '../../actions';
import Track from '../../components/Track'
import { PermissionsAndroid } from 'react-native';

class OfflineMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }
    
    //  primary: '#3498db',
    // accent: '#f1c40f',
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

        return (
            <View style={{ flex: 1, backgroundColor: background }}>
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
}

const mapStateToProps = state => ({
    files: state.media.files
});


export default connect(mapStateToProps, { getOfflineMedia })(withTheme(OfflineMedia));