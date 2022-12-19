import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {parseTime} from '../utils/parseTime';

const Bar = ({currentSong}) => {
  const {duration, position} = useProgress();
  const parsedDuration = parseTime(duration);
  const parsedPosition = parseTime(position);
  const playerState = usePlaybackState();
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const play = async () => {
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const next = async () => {
    await TrackPlayer.skipToNext();
    const track = await TrackPlayer.getCurrentTrack();
    dispatch({type: 'CHANGE_SONG', payload: {...songs[track], id: track}});
  };

  return (
    <TouchableOpacity
      style={styles.bar}
      onPress={() => navigation.navigate('details')}>
      <Image source={currentSong.thumb} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.title}>{currentSong.title}</Text>
          <Text style={styles.artist}>{currentSong.artist}</Text>
          <Text style={styles.duration}>
            {parsedPosition} - {parsedDuration}
          </Text>
        </View>
        <View style={styles.icons}>
          {(playerState === State.Paused || playerState === State.Ready) && (
            <TouchableOpacity onPress={play}>
              <Icon name="play-arrow" size={32} style={styles.icon} />
            </TouchableOpacity>
          )}
          {playerState === State.Playing && (
            <TouchableOpacity onPress={pause}>
              <Icon name="pause" size={32} style={styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={next}>
            <Icon name="skip-next" size={32} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 100,
    backgroundColor: 'rgba(13, 71, 161, 0.8)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 57,
    height: 57,
    borderRadius: 11,
  },
  container: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    color: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  artist: {
    fontSize: 12,
    color: '#D9D9D9',
  },
  duration: {
    fontSize: 12,
    color: '#D9D9D9',
  },
});

export default Bar;
