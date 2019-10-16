import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './RootNavigator';

import configureStore from './store';
import Welcome from './components/Welcome';

const { store, persistor } = configureStore();

class App extends React.Component {
  renderActivityIndicator = () => <Welcome />;

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={this.renderActivityIndicator()}
          persistor={persistor}
        >
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
