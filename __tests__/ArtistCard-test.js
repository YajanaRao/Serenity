import 'react-native';
import React from 'react';
import ArtistCard from '../src/components/ArtistCard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('In album card renders correctly', () => {
  const onPress = jest.fn();
  renderer.create(
    <ArtistCard artwork={''} songs={''} album={''} onPress={onPress} />,
  );
});
