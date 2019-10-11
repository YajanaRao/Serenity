import React from 'react';
import RootNavigator from './RootNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './store';
import Welcome from './components/Welcome';

const { store, persistor } = configureStore();

class App extends React.Component {

  renderActivityIndicator = () => {
    return (
      <Welcome />
    );
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={this.renderActivityIndicator()}
          persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
