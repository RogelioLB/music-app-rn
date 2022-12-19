import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.navbar}
      onPress={() => navigation.navigate('playlist')}>
      <View style={styles.containerText}>
        <Icon name="music-note" size={32} style={{color: '#fff'}} />
        <Text style={styles.text}>Música</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 82,
    backgroundColor: '#1A237E',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
  },
  containerText: {
    backgroundColor: 'rgba(63, 81, 181, 0.8)',
    shadowColor: 'rgba(63, 81, 181, 0.35)',
    width: 114,
    flexDirection: 'row',
    borderRadius: 27,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default NavBar;
