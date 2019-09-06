import 'react-native';
import React from 'react';
import AlbumCard from '../src/components/AlbumCard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('In album card renders correctly', () => {
  const onPress = jest.fn();
  renderer.create(<AlbumCard artwork={""} songs={""} album={""} onPress={onPress} />);
});
