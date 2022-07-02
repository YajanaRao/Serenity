import * as React from 'react';
import { Animated, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Neomorph } from 'react-native-neomorph-shadows';
import { Icon } from '../Icon';

function IconButton({ name, onPress, color, size = 50 }: { name: string, onPress?: () => void, color?: string, size?: number }) {
    const { colors } = useTheme();
    const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph)
    const animatedShadow = new Animated.Value(8);

    // When button is pressed in, animate the scale to 1.5
    const onPressIn = () => {
        Animated.spring(animatedShadow, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    // When button is pressed out, animate the scale back to 1
    const onPressOut = () => {
        Animated.spring(animatedShadow, {
            toValue: 8,
            useNativeDriver: true,
        }).start();
    };

    


    return (
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
        >
            <AnimatedNeomorph
                // swapShadows // <- change zIndex of each shadow color
                darkShadowColor={'black'}
                lightShadowColor={'white'}
                style={{
                    shadowRadius: animatedShadow,
                    borderRadius: size/2,
                    backgroundColor: colors.surface,
                    width: size,
                    height: size,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <Icon
                    name={name}
                    size={size/2}
                    color={color}
                />
            </AnimatedNeomorph>
        </Pressable>
    )
}

export default IconButton;