import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {parseTime} from '../utils/parseTime';

const Data = ({title, artist}) => {
  const {duration, position} = useProgress();
  const parsedDuration = parseTime(duration);
  const parsedPosition = parseTime(position);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.artist}>{artist}</Text>
        <Text style={styles.duration}>
          {parsedPosition} - {parsedDuration}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    marginTop: 20,
    padding: 20,
    width: '100%',
  },
  artist: {
    fontSize: 15,
    color: '#fff',
  },
  duration: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Data;
