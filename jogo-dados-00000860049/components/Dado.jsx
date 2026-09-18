import React from 'react';
import { Image, StyleSheet } from 'react-native';

const imagensDados = {
  1: require('../assets/lado01.png'),
  2: require('../assets/lado02.png'),
  3: require('../assets/lado03.png'),
  4: require('../assets/lado04.png'),
  5: require('../assets/lado05.png'),
  6: require('../assets/lado06.png'),
};

export default function Dado({ valor }) {
  return (
    <Image 
      source={imagensDados[valor] || imagensDados[1]} 
      style={styles.dado} 
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 60,
    height: 60,
    margin: 6,
  },
});