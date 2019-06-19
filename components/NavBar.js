import * as React from 'react';
import {  Appbar, Surface, Title, IconButton } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native';



class NavBar extends React.PureComponent {


  render() {
    return (
      <Surface style={[this.props.style, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        {/* <Appbar.Header> */}
          {/* <Appbar.Action icon="menu" onPress={() => this.props.navigation.toggleDrawer()} /> */}
          <View style={{ flex: 1 }}>
            <IconButton icon="menu" onPress={() => this.props.navigation.toggleDrawer()} animated={true} />
          </View>
        
        <View style={{ alignItems: 'center', textAlign: 'center', flex: 1 }}>
          <Title>Serenity</Title>
        </View>
        <View style={{ flex: 1 }}>

        </View>
          {/* <Appbar.Content
            // titleStyle={{ textAlign: 'center' }}
            title="Serenity"
          /> */}

          {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        {/* </Appbar.Header> */}
        </Surface>

    );
  }
}



export default withNavigation(NavBar);

