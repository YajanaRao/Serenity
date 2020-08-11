import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { useScreens } from 'react-native-screens';

import { RootNavigator } from './RootNavigator';
import configureStore from './store';
import { Welcome } from './components/Welcome';

useScreens();

const { store, persistor } = configureStore();

const App = () => {
  const renderActivityIndicator = () => <Welcome />;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={renderActivityIndicator()} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
