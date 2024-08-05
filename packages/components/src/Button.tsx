import * as React from 'react';
import { Animated, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import color from 'color';
import { Text } from './Text';
import { Icon } from './Icon';

export interface ButtonProps {
  icon?: string;
  children: React.ReactChild | React.ReactChild[]
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean
}


const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({ children, onPress, icon, color: buttonColor, style, disabled = false }: ButtonProps) {
  const { colors, dark, roundness } = useTheme();

  const { current: elevation } = React.useRef<Animated.Value>(new Animated.Value(4)); // Initial value for opacity: 0

  function handlePressIn() {
    Animated.timing(elevation, {
      toValue: 8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.timing(elevation, {
      toValue: 4,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  let backgroundColor: string, textColor: string;
  if (disabled) {
    backgroundColor = color(dark ? "white" : "black")
      .alpha(0.12)
      .rgb()
      .string();
    textColor = color(dark ? "white" : "black")
      .alpha(0.32)
      .rgb()
      .string();
  } else {
    backgroundColor = buttonColor ? buttonColor : colors.primary;
    textColor = color(colors.primary).isDark() ? 'white' : 'black';
  }

  const justifyContent = icon ? "space-between" : "center";
  return (
    <AnimatedTouchable
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.8}

      style={[{
        elevation,
        backgroundColor,
        borderRadius: roundness,
        justifyContent
      }, styles.button, style]}
      // @ts-ignore
      onMouseEnter={handlePressIn}
      onMouseLeave={handlePressOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={[styles.label, {
        color: textColor,
      }]}
      >
        {children}
      </Text>
      {icon && <Icon name={icon} size={20} color={textColor} style={{ marginLeft: 4 }} />}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    minWidth: 84,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 0,
  },
});
