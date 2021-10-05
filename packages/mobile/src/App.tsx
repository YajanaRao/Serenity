import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, StyleSheet } from 'react-native';
import { store } from '@serenity/core';
import { persistStore } from 'redux-persist';
import { Spinner } from '@serenity/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootScreen } from './Root';
import { SentryContainer } from './containers/SentryContainer';



const persistor = persistStore(store);


const App = () => {
  const renderActivityIndicator = () => (
    <View style={styles.container}>
      <Spinner />
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
    </SentryContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});