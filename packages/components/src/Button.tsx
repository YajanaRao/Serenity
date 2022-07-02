import * as React from 'react';
import { Animated, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import color from 'color';
import { Text } from './Text';
import { Icon } from './Icon';
import { NeomorphFlex } from 'react-native-neomorph-shadows';


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
  const AnimatedNeomorph = Animated.createAnimatedComponent(NeomorphFlex)
  const { current: shadowRadius } = React.useRef<Animated.Value>(new Animated.Value(8)); // Initial value for shadowRadius: 8

  function handlePressIn() {
    Animated.timing(shadowRadius, {
      toValue: 8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.timing(shadowRadius, {
      toValue: 0,
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
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.8} 
      // onMouseEnter={handlePressIn}
      // onMouseLeave={handlePressOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <AnimatedNeomorph
        darkShadowColor={'black'}
        lightShadowColor={'white'}
        style={{
          shadowRadius: shadowRadius,
          borderRadius: 25,
          height: 50,
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: 'wrap'
        }}
      >
      <View style={[styles.button, style, {backgroundColor, justifyContent}]}>
        <Text style={[styles.label, {
          color: textColor,
        }]}
        >
          {children}
        </Text>
        {icon && <Icon name={icon} size={20} color={textColor} style={{ marginLeft: 4 }} />}
      </View>
      </AnimatedNeomorph>
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
    minWidth: 125,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 25,
  },
});
