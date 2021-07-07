import React from 'react';
import { ThemeProvider, Icon, DarkTheme, SafeAreaProvider } from '@serenity/components';
import { Home } from './Home/Home';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={DarkTheme}
      >
        <Home />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
