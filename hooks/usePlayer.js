import {useEffect, useState} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  RepeatMode,
} from 'react-native-track-player';
import {store} from '../store';
import {Capability} from 'react-native-track-player';

export const usePlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
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

  return currentSong;
};
