import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import { Dimensions } from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme
} from 'react-native-paper';
import { connect } from 'react-redux';

import DetailScreen from './pages/Details';
import ProfileScreen from './pages/Profile';
import { updateTheme } from './actions';
import SideMenu from './components/SideBar';
import HomeScreen from './pages/Home'; 


const PreferencesContext = React.createContext();

const AppNavigator = createDrawerNavigator({
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
    },
    Profile: {
      screen: ProfileScreen
    }
  },{
    drawerWidth: Dimensions.get('window').width - 120, 
    contentComponent: () => (
      <PreferencesContext.Consumer>
        {preferences => (
          <SideMenu 
            isDarkTheme={preferences.isDarkTheme} 
            toggleTheme={preferences.theme}
          />
        )}
      </PreferencesContext.Consumer>
    )}
);

    // drawerType: "slide",

const App = createAppContainer(AppNavigator);



class RootNavigator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: DefaultTheme
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.themeType) {
        this.setState({ theme: nextProps.themeType }) 
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
    this.props.updateTheme(theme);
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
              <App /> 
          </PreferencesContext.Provider>
        </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  themeType: state.theme.themeType
});

export default connect(mapStateToProps, { updateTheme })(RootNavigator);