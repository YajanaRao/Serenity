import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View } from 'react-native';
import { store } from '@serenity/core';
import { persistStore } from 'redux-persist';
import { Spinner } from '@serenity/components';
import { RootScreen } from './Root';
import { SentryContainer } from './containers/SentryContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const persistor = persistStore(store);


const App = () => {
  const renderActivityIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner />
    </View>
  );

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={renderActivityIndicator()} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
