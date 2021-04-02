/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Track } from '../components/Track';

// Note: test renderer must be required after react-native.

it('In active track renders correctly', () => {
  const track = { title: 'title', artist: 'Tester' };
  const play = jest.fn();
  renderer.create(<Track track={track} active={false} play={play} />);
});

it('Active track renders correctly', () => {
  const track = { title: 'title', artist: 'Tester' };
  const play = jest.fn();
  renderer.create(<Track track={track} active play={play} />);
});

it('Blank component renders correctly', () => {
  const track = { title: 'title', album: 'Testing' };
  const play = jest.fn();
  const tree = renderer
    .create(<Track track={track} active play={play} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
