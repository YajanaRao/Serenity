
import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Caption, Appbar, TouchableRipple, Colors } from 'react-native-paper';




// https://dev.to/hrastnik/lets-create-a-custom-animated-tab-bar-with-react-native-3496
class TabBar extends React.Component {
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
            <Appbar.Header style={[styles.container, { backgroundColor: colors.primary }]}>
                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? colors.accent : Colors.white;

                    return (
                        <TouchableRipple
                            key={routeIndex}
                            style={styles.tabButton}
                            rippleColor={Colors.white}
                            underlayColor={Colors.white}
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

                                    <Caption style={{ color: tintColor, textAlign: 'center' }}>{getLabelText({ route })}</Caption>
                            </View>
                        </TouchableRipple>
                    );
                })}
            </Appbar.Header>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    tabButton: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }
});

export default withTheme(TabBar);