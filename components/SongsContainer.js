import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Song from './Song';

const SongsContainer = () => {
  const songs = useSelector(state => state.songs);

  return (
    <ScrollView style={styles.list}>
      {songs.map((song, key) => (
        <Song key={key} song={song} id={key} />
      ))}
      <View style={{height: 130}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 7,
  },
});

export default SongsContainer;
