import React from 'react';
import Bar from './components/Bar';
import Container from './components/Container';
import NavBar from './components/NavBar';
import {Provider, useSelector} from 'react-redux';
import {store} from './store';
import SongsContainer from './components/SongsContainer';
import {usePlayer} from './hooks/usePlayer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProgressBar from './components/ProgressBar';
import {Text, View} from 'react-native';
import ImageCover from './components/ImageCover';
import Data from './components/Data';
import ButtonsContainer from './components/ButtonsContainer';

const Stack = createNativeStackNavigator();

const Playlist = () => {
  const currentSong = usePlayer();
  return (
    <Container>
      <NavBar />
      <Text
        style={{
          color: '#fff',
          padding: 12,
          fontSize: 18,
          borderBottomWidth: 5,
          borderBottomColor: '#2196F3',
          maxWidth: 200,
          marginLeft: 14,
        }}>
        Todas las canciones
      </Text>
      <SongsContainer />
      {currentSong && <Bar currentSong={currentSong} />}
    </Container>
  );
};

const DetailedSong = () => {
  const currentSong = useSelector(state => state.player.currentSong);
  return (
    <Container>
      <NavBar />
      <View style={{alignItems: 'center', marginTop: 50, flex: 1}}>
        <ImageCover source={currentSong.thumb} />
        <Data title={currentSong.title} artist={currentSong.artist} />
        <ProgressBar />
        <ButtonsContainer />
      </View>
    </Container>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="playlist"
            component={Playlist}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="details"
            component={DetailedSong}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
