import * as React from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { connect } from 'react-redux';

import RootScreen from './pages/Root';
import { defaultSetup } from './actions';

class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: DarkTheme,
      themeType: 'dark',
    };
  }

  componentDidMount() {
    const { setup, defaultSetupFromProps = defaultSetup } = this.props; 
    if (!setup) {
      defaultSetupFromProps();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.themeType !== state.themeType) {
      if (props.themeType === 'dark') {
        return {
          theme: DarkTheme,
          themeType: 'dark',
        };
      }
      if (props.themeType === 'default') {
        return {
          theme: DefaultTheme,
          themeType: 'default',
        };
      }
      return {
        theme: DarkTheme,
        themeType: 'dark',
      };
    }
    return null;
  }

  render() {
    const { theme } = this.state;
    return (
      <PaperProvider theme={theme}>
        <RootScreen />
      </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  themeType: state.config.themeType,
  setup: state.config.setup,
});

export default connect(
  mapStateToProps,
  { defaultSetup },
)(RootNavigator);
