import * as React from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface RefreshIndicatorProps {
    refreshing: boolean;
    onRefresh: () => void;
}

export function RefreshIndicator({ refreshing = false, onRefresh, ...rest }: RefreshIndicatorProps) {
    const { colors } = useTheme();

    return (
        <RefreshControl
            {...rest}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#12c2e9', '#c471ed', '#f64f59']}
            progressBackgroundColor={colors.surface}
            size={0}
            title="Loading"
            titleColor={colors.text}
            tintColor={colors.primary}
        />
    );
}
