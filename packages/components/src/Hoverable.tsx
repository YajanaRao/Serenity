import * as React from 'react';
import {
  Pressable, Animated, StyleProp, ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import color from 'color';

export interface HoverableProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export function Hoverable({ children, onPress, style }: HoverableProps) {
  const { colors, dark } = useTheme();

  const { current: elevation } = React.useRef<Animated.Value>(new Animated.Value(4)); // Initial value for opacity: 0

  function handleFadeIn() {
    Animated.timing(elevation, {
      toValue: 8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function handleFadeOut() {
    Animated.timing(elevation, {
      toValue: 4,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  const activeBackgroundColor = dark ? color(colors.surface).lighten(0.6).rgb().string() : color(colors.surface).darken(0.1).rgb().string();

  const backgroundColor = elevation.interpolate({
    inputRange: [4, 8],
    outputRange: [color(colors.surface).rgb().string(), activeBackgroundColor],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      android_ripple={{ color: colors.surface }}
    >
      <Animated.View
        style={[{
          // backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
          backgroundColor,
          elevation,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          borderWidth: 0,
        }, style]}
                // @ts-ignore
        onMouseEnter={handleFadeIn}
        onMouseLeave={handleFadeOut}
        onPressIn={handleFadeIn}
        onPressOut={handleFadeOut}
      >

        {children}
      </Animated.View>
    </Pressable>
  );
}
