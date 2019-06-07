import * as React from 'react';
import {  Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';



class NavBar extends React.PureComponent {


  render() {
    return (
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
          <Appbar.Content
            // titleStyle={{ textAlign: 'center' }}
            title="Serenity"
          />
        {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
  
    );
  }
}



export default withNavigation(NavBar);

