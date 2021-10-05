import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@serenity/core';
import { Spinner } from '@serenity/components';
import { Root } from 'Home/Root';

const persistor = persistStore(store);
function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}

export default App;
