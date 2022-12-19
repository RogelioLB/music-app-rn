import React from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const ProgressBar = () => {
  const {duration, position} = useProgress();

  const handleSlide = async value => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <Slider
      maximumValue={duration}
      value={position}
      style={styles.progress}
      maximumTrackTintColor="#80DEEA"
      minimumTrackTintColor="#fff"
      thumbTintColor="#D9D9D9"
      onSlidingComplete={handleSlide}
    />
  );
};

const styles = StyleSheet.create({
  progress: {
    width: '100%',
    height: 20,
    marginTop: 50,
  },
});

export default ProgressBar;
