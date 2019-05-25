import * as React from 'react';
import RootNavigator from './RootNavigator';
import { Provider } from 'react-redux';

import Store from './store'

class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <RootNavigator />
      </Provider>
    );
  }
}

export default App;