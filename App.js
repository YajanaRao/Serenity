import * as React from 'react';
import RootNavigator from './RootNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import Store from './store'

class App extends React.Component {

  render() {
    return (
      <Provider store={ Store }>
        <RootNavigator /> 
      </Provider>
    );
  }
}

export default App;