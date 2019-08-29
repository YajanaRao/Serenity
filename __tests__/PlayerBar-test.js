/**
 * @format
 */

import 'react-native';
import React from 'react';
import PlayerBar from '../src/components/PlayerBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Playing play bar renders correctly without art cover', () => {
  const track = { title: 'title', artist: 'Tester' } 
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'playing'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});

it('Pause play bar renders correctly without art cover', () => {
  const track = {title: 'title', artist: 'Tester'};
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'pause'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});


it('Track with album name renders correctly without art cover', () => {
  const track = {title: 'title', album: 'Testing'};
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'pause'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});


it('Playing play bar renders correctly with art cover', () => {
  const track = {title: 'title', album: 'Testing', artcover: 'test'};
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'playing'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});

it('Pause play bar renders correctly with art cover', () => {
  const track = {title: 'title', album: 'Testing', artcover: 'test'};
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'pause'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});

it('Track with album name renders correctly with art cover', () => {
  const track = {title: 'title', album: 'Testing', artcover: 'test'};
  const navigation = jest.fn();
  const togglePlayback = jest.fn();
  renderer.create(
    <PlayerBar
      status={'pause'}
      active={track}
      navigation={navigation}
      togglePlayback={togglePlayback}
    />,
  );
});