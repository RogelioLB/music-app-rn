import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';

const Song = ({song, id}) => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs);

  const selectSong = async () => {
    await TrackPlayer.skip(id);
    await TrackPlayer.play();
    dispatch({type: 'CHANGE_SONG', payload: {...songs[id], id: id}});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selectSong}>
      <Image source={song.thumb} style={styles.image} />
      <View style={styles.data}>
        <Text style={styles.title}>{song.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(128, 222, 234, 0.25)',
    marginVertical: 7.5,
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
  },
  data: {
    padding: 7,
    flex: 1,
  },
  title: {
    flexShrink: 1,
    fontSize: 14,
    color: '#dfdfdf',
    fontWeight: 'bold',
  },
});

export default Song;
