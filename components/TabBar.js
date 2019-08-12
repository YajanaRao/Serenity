
import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Caption, Portal, TouchableRipple, Colors, Surface, Divider, Text } from 'react-native-paper';
import Player from '../pages/shared/Player';
import MiniPlayer from '../components/MiniPlayer';

// https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496
// activeColor: '#f0edf6',
//  inactiveColor: '#3e2465',
class TabBar extends React.PureComponent {
    render() {
        const {
            renderIcon,
            getLabelText,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation,
        } = this.props;

        const { colors } = this.props.theme;

        const { routes, index: activeRouteIndex } = navigation.state;

        return (
            <Surface style={{ elevation: 4 }}>
                {/* <Player /> */}
                {/* <TouchableRipple
                    onPress={() => navigation.navigate('MyModal')}
                >
                    <Text>Player</Text>
                </TouchableRipple> */}
                <MiniPlayer/>
                <Divider/>
                {/* <Appbar.Header style={[styles.container, { backgroundColor: colors.Surface }]}> */}
                <Surface style={[styles.container, { backgroundColor: colors.Surface }]}>
                    {routes.map((route, routeIndex) => {
                        const isRouteActive = routeIndex === activeRouteIndex;
                        const tintColor = isRouteActive ? colors.primary : colors.text;
                        return (
                            <TouchableRipple
                                key={routeIndex}
                                style={styles.tabButton}
                                rippleColor={colors.primary}
                                underlayColor={colors.primary}
                                borderless={true}
                                onPress={() => {
                                    onTabPress({ route });
                                }}
                                onLongPress={() => {
                                    onTabLongPress({ route });
                                }}
                                accessibilityLabel={getAccessibilityLabel({ route })}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {renderIcon({ route, focused: isRouteActive, tintColor })}

                                    <Caption style={{ color: tintColor, textAlign: 'center', fontSize: 10, margin: 0, padding: 0 }}>{getLabelText({ route })}</Caption>
                                </View>
                            </TouchableRipple>
                        );
                    })}
                </Surface>
                {/* </Appbar.Header> */}
            </Surface>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 4
    },
    tabButton: { 
        flex: 1, 
        justifyContent: "center", 
        margin: 0,
        padding: 0,
        alignItems: "center"
    }
});

export default withTheme(TabBar);