import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { withTheme, Text, Switch, Drawer, TouchableRipple } from 'react-native-paper';

class DetailScreen extends React.PureComponent {

  static navigationOptions = {
    headerTitle: 'Settings',
  };
  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <ScrollView>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => console.log("Change theme")}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={false} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(DetailScreen);

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
