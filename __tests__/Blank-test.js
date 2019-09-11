import 'react-native';
import React from 'react';
import Blank from '../src/components/Blank';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('In album card renders correctly', () => {
  const onPress = jest.fn();
  renderer.create(
    <Blank fetchData={onPress} />,
  );
});
