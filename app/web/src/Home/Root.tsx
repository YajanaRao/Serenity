import * as React from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from 'Home/Home';
import { useAppSelector, selectThemeType } from '@serenity/core';

export function Root() {
    const themeType = useAppSelector(selectThemeType);

    let theme = DefaultTheme;

    if (themeType === 'dark') {
        theme = DarkTheme;
    }
    return (
        <SafeAreaProvider>
            <ThemeProvider
                theme={theme}
            >
                <Home />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
