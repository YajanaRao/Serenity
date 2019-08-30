/**
 * @format
 */

import 'react-native';
import React from 'react';
import Track from '../src/components/Track';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('In active track renders correctly', () => {
  const track = {title: 'title', artist: 'Tester'};
  const play = jest.fn();
  renderer.create(
    <Track track={track} active={false} play={play} />,
  );
});

it('Active track renders correctly', () => {
  const track = {title: 'title', artist: 'Tester'};
  const play = jest.fn();
  renderer.create(
    <Track track={track} active={true} play={play} />,
  );
});

it('Track with album name renders correctly', () => {
  const track = {title: 'title', album: 'Testing'};
  const play = jest.fn();
  renderer.create(
    <Track track={track} active={true} play={play} />,
  );
});
