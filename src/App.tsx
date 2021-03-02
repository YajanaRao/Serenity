import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

import { RootNavigator } from './RootNavigator';
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
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate
            loading={renderActivityIndicator()}
            persistor={persistor}
          >
            <RootNavigator />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
