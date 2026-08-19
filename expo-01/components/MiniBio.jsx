import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Profile from './Profile';

export default function MiniBio() {
  return (
    <View style={styles.cardContainer}>
      <Profile />
      
      <Text style={styles.bioText}>
        Estudante de Sistemas para Internet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bioText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
});