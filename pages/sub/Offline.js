import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Surface, Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { getOfflineMedia } from '../../actions';
import SwiperContainer from '../../containers/SwiperContainer';
import Track from '../../components/Track'

class OfflineMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }
    

    componentDidMount() {
        this.props.getOfflineMedia();
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.files) {
            console.log("files", nextProps.files);
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
        // console.log("offline files",files);
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