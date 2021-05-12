import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { RootScreen } from './Root';
import configureStore from './store';

const { store, persistor } = configureStore();

const App = () => {
  const renderActivityIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
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
