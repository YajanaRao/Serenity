import React from 'react';
import { ThemeProvider, Icon, DarkTheme, Spinner } from '@serenity/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from 'Home/Home';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@serenity/core';
import { persistStore } from 'redux-persist';


const persistor = persistStore(store);
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
