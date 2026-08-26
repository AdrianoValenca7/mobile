import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CalculadoraNascimento() {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [idade, setIdade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const calcularData = () => {
    if (!dia || !mes || !idade) {
      setDataNascimento('Por favor, preencha todos os campos.');
      return;
    }

    const anoAtual = new Date().getFullYear();
    const anoNascimento = anoAtual - parseInt(idade, 10);

    const diaFormatado = dia.padStart(2, '0');
    const mesFormatado = mes.padStart(2, '0');

    setDataNascimento(`${diaFormatado}/${mesFormatado}/${anoNascimento}`);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titulo}>Descobrir Data de Nascimento</Text>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dia</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15"
            keyboardType="numeric"
            maxLength={2}
            value={dia}
            onChangeText={setDia}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mês</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 08"
            keyboardType="numeric"
            maxLength={2}
            value={mes}
            onChangeText={setMes}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 25"
            keyboardType="numeric"
            maxLength={3}
            value={idade}
            onChangeText={setIdade}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={calcularData}>
        <Text style={styles.textoBotao}>Calcular Data</Text>
      </TouchableOpacity>

      {dataNascimento ? (
        <View style={styles.boxResultado}>
          <Text style={styles.labelResultado}>Data de Nascimento Estimada:</Text>
          <Text style={styles.resultado}>{dataNascimento}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f172a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#475569',
    fontWeight: '500',
  },
  input: {
    height: 48,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#0f172a',
  },
  botao: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  boxResultado: {
    backgroundColor: '#eff6ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  labelResultado: {
    fontSize: 13,
    color: '#1d4ed8',
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    marginTop: 4,
  },
});