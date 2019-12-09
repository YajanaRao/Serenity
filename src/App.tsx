import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { useScreens } from 'react-native-screens';

import RootNavigator from './RootNavigator';
import configureStore from './store';
import { Welcome } from './components/Welcome';

useScreens();

const { store, persistor } = configureStore();

class App extends React.Component {
  renderActivityIndicator = () => <Welcome />;

  render() {
    return (
      <NavigationNativeContainer>
        <Provider store={store}>
          <PersistGate
            loading={this.renderActivityIndicator()}
            persistor={persistor}
          >
            <RootNavigator />
          </PersistGate>
        </Provider>
      </NavigationNativeContainer>
    );
  }
}

export default App;
