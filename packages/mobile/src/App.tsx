import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { store } from '@serenity/core';
import { persistStore } from 'redux-persist';
import { RootScreen } from './Root';
import { SentryContainer } from './containers/SentryContainer';



const persistor = persistStore(store);


const App = () => {
  const renderActivityIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );

  return (
    <SentryContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={renderActivityIndicator()} persistor={persistor}>
            <RootScreen />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </SentryContainer >
  );
};

export default App;
