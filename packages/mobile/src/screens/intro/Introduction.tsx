import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageRequireSource,
} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import { Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { Screen } from 'components';
import { LocalLibraryAccess } from './components/LocalLibraryAccess';
import GoogleLogin from './components/GoogleLogin';
import { appIntroduction } from '../../actions/userState';
import Images from '../../assets/Images';

const data = [
  {
    type: 'Welcome',
    imageUri: Images.welcomeImage,
    heading: 'Getting Started',
    description: 'Modern music player focused on streaming from free sources.',
    key: 'first',
    color: '#00B0FF',
    icon: 'arrow-forward',
  },
  {
    type: 'Grant Access',
    imageUri: Images.filesImage,
    heading: 'External Storage',
    description:
      'Serenity Needs Access to your External Storage to read your music',
    key: 'second',
    color: '#F9A826',
  },
  {
    type: 'Youtube',
    imageUri: Images.youtubeImage,
    heading: 'Youtube Music',
    description:
      'Serenity Needs Access to your YouTube library to list playlist you have created in YouTube. (Optional)',
    key: 'third',
    color: '#F50057',
    icon: 'logo-youtube',
  },
  // {
  //   type: 'Customization',
  //   imageUri: require('../../../assets/theme.png'),
  //   heading: 'App theme',
  //   description:
  //     'Select your preferred theme!',
  //   key: 'fourth',
  //   color: '#6C63FF',
  //   icon: "color-palette-outline"
  // },
  {
    type: 'Ready',
    imageUri: Images.readyImage,
    heading: "Let's Go",
    description: 'Introduction is over Enjoy Serenity!',
    key: 'fourth',
    color: '#00BFA6',
    icon: 'done-outline',
  },
];
const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Circle = ({
  scrollOffsetAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [0, 0.5, 0.99];
        const inputRangeOpacity = [0, 0.5, 0.99];
        const scale = scrollOffsetAnimatedValue.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });

        const opacity = scrollOffsetAnimatedValue.interpolate({
          inputRange: inputRangeOpacity,
          outputRange: [0.2, 0, 0.2],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, data.length];
  const translateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({
  type,
  imageUri,
  heading,
  description,
  scrollOffsetAnimatedValue,
  color,
  next,
}: {
  type: string;
  imageUri: ImageRequireSource;
  description: string;
  heading: string;
  scrollOffsetAnimatedValue: Animated.Value;
  color: string;
  next: () => void;
}) => {
  const inputRange = [0, 0.5, 0.99];
  const inputRangeOpacity = [0, 0.5, 0.99];
  const scale = scrollOffsetAnimatedValue.interpolate({
    inputRange,
    outputRange: [1, 0, 1],
  });

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  function launchApp() {
    dispatch(appIntroduction(true));
    navigation.navigate('App');
  }

  function renderAction() {
    switch (type) {
      case 'Grant Access':
        return <LocalLibraryAccess color={color} next={next} />;
      case 'Youtube':
        return <GoogleLogin next={next} color={color} />;
      case 'Welcome':
        return (
          <Button
            mode="contained"
            icon="arrow-forward"
            color={color}
            onPress={next}
          >
            Start
          </Button>
        );
      default:
        return (
          <Button
            mode="contained"
            icon="home"
            color={color}
            onPress={launchApp}
          >
            Go to Home
          </Button>
        );
    }
  }

  return (
    <View style={styles.itemStyle}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image
          source={imageUri}
          style={[
            styles.imageStyle,
            {
              transform: [{ scale }],
            },
          ]}
        />
      </View>
      <View
        style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}
      >
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity,
                color: colors.text,
              },
            ]}
          >
            {heading}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.description,
              {
                opacity,
                color: colors.text,
              },
            ]}
          >
            {description}
          </Animated.Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          {renderAction()}
        </View>
      </View>
    </View>
  );
};

const Pagination = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, data.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * DOT_SIZE],
  });

  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function IntroductionScreen() {
  const ref = React.useRef<PagerView>(null);

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);

  function nextPage() {
    const nextPageIndex = page + 1;
    ref.current?.setPage(nextPageIndex);
  }

  return (
    <Screen>
      <Circle scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
      <AnimatedPagerView
        ref={ref}
        initialPage={page}
        style={{ width: '100%', height: '100%' }}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {
            listener: ({ nativeEvent: { offset, position } }) => {
              setPage(position);
            },
            useNativeDriver: true,
          },
        )}
      >
        {data.map((item, index) => (
          <View collapsable={false} key={index}>
            <Item
              {...item}
              next={nextPage}
              scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
            />
          </View>
        ))}
      </AnimatedPagerView>
      {/* <Image
        style={styles.logo}
        source={require('../../../assets/logo_txt.png')}
      /> */}
      <Pagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
      <Ticker
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {
    marginTop: 8,
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    flex: 1,
  },
  heading: {
    // color: '#444',
    // color: "red",
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Nunito-Bold',
    letterSpacing: 2,
    marginBottom: 5,
    textAlign: 'right',
  },
  description: {
    fontWeight: '600',
    textAlign: 'right',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    fontFamily: 'Nunito-Light',
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: '-90deg' },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT - 4,
    fontFamily: 'Nunito-Black',
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    // fontWeight: '800',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
});
