import {useEffect, useState} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  RepeatMode,
} from 'react-native-track-player';
import {store} from '../store';
import {Capability} from 'react-native-track-player';
import {useDispatch} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';

export const usePlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        progressUpdateEventInterval: 1,
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    };

    store.subscribe(async () => {
      setCurrentSong(store.getState().player.currentSong);
      if ((await TrackPlayer.getQueue()).length === 0) {
        await TrackPlayer.add(store.getState().songs);
      }
    });
    setupPlayer();
  }, []);

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
            const title = metadata.title || file.name.replace('.mp3', '');
            return {
              title: title.trim(),
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

  return currentSong;
};
