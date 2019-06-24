import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import * as React from 'react';
import { Dimensions } from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme
} from 'react-native-paper';
import { connect } from 'react-redux';


import { updateTheme } from './actions';
import SideMenu from './components/SideBar';
import RootScreen from './pages/Root'; 
import { changeNavigationBarColor } from './containers/NavigationBar';


const PreferencesContext = React.createContext();

// const AppNavigator = createDrawerNavigator({
//     Home: {
//       screen: HomeScreen,
//     },
//     Details: {
//       screen: DetailScreen,
//     },
//     Profile: {
//       screen: ProfileScreen
//     }
//   },{
//     drawerWidth: Dimensions.get('window').width - 120, 
//     contentComponent: () => (
//       <PreferencesContext.Consumer>
//         {preferences => (
//           <SideMenu 
//             isDarkTheme={preferences.isDarkTheme} 
//             toggleTheme={preferences.theme}
//           />
//         )}
//       </PreferencesContext.Consumer>
//     )}
// );

    // drawerType: "slide",


// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Settings: {
//     screen: SettingScreen,
//   },
//   Profile: {
//     screen: ProfileScreen
//   }
// }, {
//     // drawerWidth: Dimensions.get('window').width - 120,
//     // contentComponent: () => (
//     //   <PreferencesContext.Consumer>
//     //     {preferences => (
//     //       <SideMenu
//     //         isDarkTheme={preferences.isDarkTheme}
//     //         toggleTheme={preferences.theme}
//     //       />
//     //     )}
//     //   </PreferencesContext.Consumer>
//     // )
//   }
// );

// const App = createAppContainer(AppNavigator);



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
    }
  }

  changeNavBarColor = async (theme) => {
    try {
      const { colors, dark } = theme;
      changeNavigationBarColor(colors.surface, !dark);
    } catch (e) {
    }

  };

  _toggleTheme = () => {
    let theme = DarkTheme;
    if(this.state.theme === DarkTheme){
      theme = DefaultTheme;
    }
    this.setState({
      theme: theme,
    });
    this.props.updateTheme(theme);
    this.changeNavBarColor(theme);
  }
    

  render() {
    // this.changeNavBarColor();

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