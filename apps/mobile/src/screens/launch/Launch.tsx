import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

import {selectIntroSlides, useAppSelector} from '@serenity/core';

export function LaunchScreen({navigation}) {
	const {colors} = useTheme();
	const introSlidesShown = useAppSelector(selectIntroSlides);

	useEffect(() => {
		isSignedIn();
	}, []);

	const isSignedIn = () => {
		if (introSlidesShown) {
			navigation.navigate('App');
		} else {
			navigation.navigate('Intro');
		}
	};

	return <View style={{flex: 1, backgroundColor: colors.background}} />;
}
