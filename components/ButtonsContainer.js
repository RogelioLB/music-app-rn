import React from 'react';
import {StyleSheet, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import ButtonIcon from './ButtonIcon';

const ButtonsContainer = () => {
  const state = usePlaybackState();

  const handlePlay = async () => {
    await TrackPlayer.play();
  };

  const handlePause = async () => {
    await TrackPlayer.pause();
  };

  const handleNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const handlePrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  return (
    <View style={styles.container}>
      <ButtonIcon name="skip-previous" onPress={handlePrevious} />
      {state === State.Paused || state === State.Ready ? (
        <ButtonIcon name="play-arrow" onPress={handlePlay} />
      ) : (
        <ButtonIcon name="pause" onPress={handlePause} />
      )}

      <ButtonIcon name="skip-next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default ButtonsContainer;
