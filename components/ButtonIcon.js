import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ButtonIcon = ({name, onPress}) => {
  const size = 70;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color="#fff" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {},
});

export default ButtonIcon;
