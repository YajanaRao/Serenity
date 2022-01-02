import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@serenity/core';
import { Spinner } from '@serenity/components';
import { Root } from 'Home/Root';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const persistor = persistStore(store);

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Root />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>

  );
}

export default App;
