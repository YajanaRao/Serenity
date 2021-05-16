import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { RootScreen } from './Root';
import configureStore from './store';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://94ad3322cfed4d539c476404c19fee4c@o291897.ingest.sentry.io/5767946",
});

const { store, persistor } = configureStore();


const App = () => {
  const renderActivityIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );

  return (
<Sentry.TouchEventBoundary>
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={renderActivityIndicator()} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
      </SafeAreaProvider>
      </Sentry.TouchEventBoundary>
  );
};

export default App;
