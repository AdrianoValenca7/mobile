import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import MiniBio from '../components/MiniBio';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Título obrigatório */}
      <Text style={styles.title}>
        App criado para a disciplina Programação para Dispositivos Móveis
      </Text>

      <MiniBio />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
});