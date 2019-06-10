import * as React from 'react';
import {  Appbar, Surface } from 'react-native-paper';
import { withNavigation } from 'react-navigation';



class NavBar extends React.PureComponent {


  render() {
    return (
        <Surface {...this.props}>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} />
          <Appbar.Content
            // titleStyle={{ textAlign: 'center' }}
            title="Serenity"
          />
          {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
        </Surface>
  
    );
  }
}



export default withNavigation(NavBar);

