import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import CalculadoraNascimento from '../components/CalculadoraNascimento';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Text style={styles.title}>
        App criado para a disciplina Programação para Dispositivos Móveis
      </Text>

      <CalculadoraNascimento />
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
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 12,
  },
});