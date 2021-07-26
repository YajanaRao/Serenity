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

export function Button({ children, onPress, icon, color: buttonColor, style, disabled = false }: ButtonProps) {
  const { colors, dark } = useTheme();

  const { current: opacity } = React.useRef<Animated.Value>(new Animated.Value(1)); // Initial value for opacity: 0
  const { current: elevation } = React.useRef<Animated.Value>(new Animated.Value(4)); // Initial value for opacity: 0

  function handlePressIn() {
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

  function handlePressOut() {
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
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
    >
      <Animated.View
        style={[{
          opacity,
          elevation,
          backgroundColor,
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
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    minWidth: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 0,
  },
});
