import FastImage from 'react-native-fast-image';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export default class ImageBackground extends React.Component {


    _viewRef: ?React.ElementRef<typeof View> = null;

    _captureRef = ref => {
        this._viewRef = ref;
    };

    render() {
        const { children, style, imageStyle, imageRef, ...props } = this.props;

        return (
            <View
                accessibilityIgnoresInvertColors={true}
                style={[style, { backgroundColor: 'transparent', margin: 0 }]}
                ref={this._captureRef}>
                <FastImage
                    {...props}
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            // Temporary Workaround:
                            // Current (imperfect yet) implementation of <Image> overwrites width and height styles
                            // (which is not quite correct), and these styles conflict with explicitly set styles
                            // of <ImageBackground> and with our internal layout model here.
                            // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
                            // This workaround should be removed after implementing proper support of
                            // intrinsic content size of the <Image>.
                            width: '100%',
                            height: '100%',
                        },
                        imageStyle,
                    ]}
                    ref={imageRef}
                />
                {children}
            </View>
        );
    }
}

