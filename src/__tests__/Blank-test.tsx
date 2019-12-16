import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Blank } from '../components/Blank';

// Note: test renderer must be required after react-native.

it('Blank component renders correctly', () => {
  const onPress = jest.fn();
  const tree = renderer
    .create(<Blank fetchData={onPress} text="Hello" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
