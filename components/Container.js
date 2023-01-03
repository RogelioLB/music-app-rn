import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Container = ({children}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/circle1.png')}
        style={(styles.circles, styles.circle1)}
      />
      <Image
        source={require('../assets/circle2.png')}
        style={(styles.circles, styles.circle2)}
      />
      <Image
        source={require('../assets/circle3.png')}
        style={(styles.circles, styles.circle3)}
      />
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#342e37',
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
  },
  circles: {
    width: 238,
    height: 238,
  },
  circle1: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circle2: {
    position: 'absolute',
    top: 131,
    right: 0,
  },
  circle3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  children: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
});

export default Container;
