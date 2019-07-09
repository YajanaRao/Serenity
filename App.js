import * as React from 'react';
import RootNavigator from './RootNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';

import configureStore from './store';

const { store, persistor } = configureStore();

class App extends React.Component {

  renderActivityIndicator = () => {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#212121' }}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderActivityIndicator()} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;