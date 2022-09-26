import React, { useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/core';
import Animations from 'assets/Animations';
import { StyleSheet } from 'react-native';
import { Title } from '@serenity/components';


export const FavBanner = ({ title }: { title: string }) => {
    const animatedRef = useRef<LottieView>(null);

    useFocusEffect(
        React.useCallback(() => {
            animatedRef.current?.play();

            return () => animatedRef.current?.pause();
        }, []),
    );
    return (
        <View style={styles.container}>
            <View
                style={styles.animationContainer}
            >
                <LottieView
                    ref={animatedRef}
                    source={Animations.favoriteAnimation}
                    loop
                />
            </View>
            <Title style={{ fontSize: 24 }}>{title}</Title>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: '100%',
    }
})
