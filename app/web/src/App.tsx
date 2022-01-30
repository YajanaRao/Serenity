import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@serenity/core';
import { Spinner } from '@serenity/components';
import { Root } from 'Home/Root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient()

const persistor = persistStore(store);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Root />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
