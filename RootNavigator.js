import * as React from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme
} from 'react-native-paper';
import { connect } from 'react-redux';

import { updateTheme } from './actions';
import RootScreen from './pages/Root'; 

const PreferencesContext = React.createContext();


class RootNavigator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: DarkTheme
    };
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.themeType != this.state.theme) {
        this.setState({ theme: nextProps.themeType }) 
        this._toggleTheme();
    }
  }


  _toggleTheme = () => {
    let theme = DarkTheme;
    if(this.state.theme === DarkTheme){
      theme = DefaultTheme;
    }
    this.setState({
      theme: theme,
    });
    // this.props.updateTheme(theme);
  }
    

  render() {

    return (
        <PaperProvider theme={this.state.theme}>
          <PreferencesContext.Provider
            value={{
              theme: this._toggleTheme,
              isDarkTheme: this.state.theme === DarkTheme,
            }}
          >
              <RootScreen /> 
          </PreferencesContext.Provider>
        </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  themeType: state.theme.themeType
});

export default connect(mapStateToProps, { updateTheme })(RootNavigator);