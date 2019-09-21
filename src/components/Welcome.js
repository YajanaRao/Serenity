import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Headline } from 'react-native-paper';

const Welcome = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Headline style={{ margin: 16, fontSize: 34, fontWeight: 'bold' }} >Serenity</Headline>
            <ActivityIndicator animating={true} size="large" />
        </View>
    )
}

export default Welcome;