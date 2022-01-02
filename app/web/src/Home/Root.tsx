import * as React from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from 'Home/Home';
import { useAppSelector, selectThemeType } from '@serenity/core';

const Stack = createStackNavigator();


function AppStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

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
                <AppStack />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
