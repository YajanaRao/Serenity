import * as React from 'react';
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import {ThemeProvider, DarkTheme, DefaultTheme} from '@serenity/components';
import {
	selectThemeType,
	useAppSelector,
	useAppDispatch,
	Player,
} from '@serenity/core';
import {RootNavigator} from './navigation/RootNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Config from 'react-native-config';
import {initialize, setCurrentScreenName} from 'react-native-clarity';

initialize(Config.CLARITY_PROJECT_ID);

export const RootScreen = () => {
	const navigationRef = useNavigationContainerRef();
	const routeNameRef = React.useRef();
	const themeType = useAppSelector(selectThemeType);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(Player.setUpTrackPlayer());
		return () => Player.destroyTrackPlayer();
	}, []);

	let theme = DefaultTheme;

	if (themeType === 'dark') {
		theme = DarkTheme;
	}

	return (
		<NavigationContainer
			theme={theme}
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.current.getCurrentRoute().name;
				setCurrentScreenName(routeNameRef.current);
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.current.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					routeNameRef.current = currentRouteName;
					setCurrentScreenName(currentRouteName);
				}
			}}>
			<ThemeProvider theme={theme}>
				<BottomSheetModalProvider>
					<RootNavigator />
				</BottomSheetModalProvider>
			</ThemeProvider>
		</NavigationContainer>
	);
};
