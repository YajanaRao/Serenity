import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withTheme, Divider } from 'react-native-paper';
import { connect } from 'react-redux';

import Track from '../../components/Track';

class Artist extends Component {
    state = {
        files: []
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.files != this.state.files) {
            this.setState({ files: nextProps.files });
        }
    }

    render() {
        // console.log(this.props.files)
        const { files } = this.props;
        return (
            <View>
                <FlatList
                    data={files}
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
}
const mapStateToProps = state => ({
    files: state.media.files,
    result: state.media.result
});

export default connect(mapStateToProps)(withTheme(Artist));
