import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import AppContainer from './AppContainer';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
