import TrackPlayer, {Event, State} from 'react-native-track-player';
import {store} from './store';

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    await TrackPlayer.skipToPrevious();
    const id = await TrackPlayer.getCurrentTrack();
    const nextSong = store.getState().songs[id];
    store.dispatch({type: 'CHANGE_SONG', payload: {...nextSong, id: id}});
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    await TrackPlayer.skipToNext();
    const id = store.getState().player.currentSong.id + 1;
    const nextSong = store.getState().songs[id];
    store.dispatch({type: 'CHANGE_SONG', payload: {...nextSong, id: id}});
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, e => {
    const id = e.nextTrack;
    const nextSong = store.getState().songs[id];
    store.dispatch({type: 'CHANGE_SONG', payload: {...nextSong, id}});
  });
};
