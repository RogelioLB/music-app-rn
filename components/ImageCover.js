import React from 'react';
import {Image, StyleSheet} from 'react-native';

const ImageCover = ({source}) => {
  return <Image source={source} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 253,
    height: 253,
    borderRadius: 11,
  },
});

export default ImageCover;
