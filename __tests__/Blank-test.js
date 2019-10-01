import 'react-native';
import React from 'react';
import Blank from '../src/components/Blank';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Blank component renders correctly', () => {
  const onPress = jest.fn();
  const tree = renderer.create(<Blank fetchData={onPress} text={"Hello"}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
