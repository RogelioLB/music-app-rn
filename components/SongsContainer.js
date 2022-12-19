import React, {useEffect} from 'react';
import {View, PermissionsAndroid, StyleSheet, ScrollView} from 'react-native';
import RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import MediaMeta from 'react-native-media-meta';
import Song from './Song';
import TrackPlayer from 'react-native-track-player';

const SongsContainer = () => {
  const songs = useSelector(state => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Música pide permiso para el almacenamiento.',
            message:
              'Se necesita permiso para acceder al almacenamiento ' +
              'asi podras escuchar tu musica.',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await getSongs();
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getSongs = async () => {
      const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);
      const audioFiles = await Promise.all(
        files
          .filter(file => file.name.includes('.mp3'))
          .map(async file => {
            const metadata = await MediaMeta.get(file.path);
            const image = `data:image/png;base64, ${metadata.thumb}`;

            return {
              title: metadata.title || file.name.replace('.mp3', ''),
              artist: metadata.artist || 'Unknown',
              url: file.path,
              thumb: metadata.thumb
                ? {
                    uri: image,
                  }
                : require('../assets/notfound.png'),
              artwork: require('../assets/notfound.png'),
            };
          }),
      );
      dispatch({type: 'READ_SONGS', payload: audioFiles});
    };
    requestPermission();
  }, [dispatch]);

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
    padding: 10,
  },
});

export default SongsContainer;
