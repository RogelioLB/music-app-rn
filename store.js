import {createStore, combineReducers} from 'redux';

const songsReducer = (state = [], action) => {
  switch (action?.type) {
    case 'READ_SONGS':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const playerReducer = (state = {currentSong: null}, action) => {
  switch (action?.type) {
    case 'CHANGE_SONG':
      return {
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({songs: songsReducer, player: playerReducer}),
);
