import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Headline, withTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

const Welcome = (props) => {
    const { colors } = props.theme; 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Headline style={{ margin: 16, fontSize: 48, fontWeight: 'bold', padding: 16 }} >Serenity</Headline> */}
            <ActivityIndicator animating={true} size="large" />
        </View>
    )
}

Welcome.propTypes = {
    theme: PropTypes.object.isRequired
}

export default withTheme(Welcome);