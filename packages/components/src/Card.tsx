import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

export interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function Card({ children, style = {} }: CardProps) {
    return (
        <Surface style={style}>
            {children}
        </Surface>
    );
}
