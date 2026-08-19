import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require('../assets/Gemini_Generated_Image_gsch64gsch64gsch.webp')} 
        style={styles.avatar}
      />
      <Text style={styles.name}>Adriano Valença</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#4f46e5',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});