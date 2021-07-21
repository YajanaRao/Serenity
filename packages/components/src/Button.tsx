import * as React from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import color from 'color';
import { Text } from './Text';

export interface ButtonProps {
    children: React.ReactChild | React.ReactChild[]
    onPress: () => void;
}


export function Button({ children, onPress }: ButtonProps) {
    const { colors } = useTheme();

    const { current: opacity } = React.useRef<Animated.Value>(new Animated.Value(1));  // Initial value for opacity: 0
    const { current: elevation } = React.useRef<Animated.Value>(new Animated.Value(4));  // Initial value for opacity: 0

    function handleFadeIn() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0.9,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(elevation, {
                    toValue: 8,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }


    function handleFadeOut() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(elevation, {
                    toValue: 4,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }

    const textColor = color(colors.primary).isDark() ? "white" : "black";

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            android_ripple={{ color: colors.primary }}
        >
            <Animated.View
                style={[{
                    backgroundColor: colors.primary,
                    opacity,
                    elevation,
                }, styles.button]}
                // @ts-ignore
                onMouseEnter={handleFadeIn}
                onMouseLeave={handleFadeOut}
                onPressIn={handleFadeIn}
                onPressOut={handleFadeOut}
            >
                <Text style={[styles.label, {
                    color: textColor
                }]}>
                    {children}
                </Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    label: {
        textAlign: "center",
        letterSpacing: 1,
        marginVertical: 9,
        fontSize: 14,
        fontWeight: "500",
    },
    button: {
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 0,
    }
});