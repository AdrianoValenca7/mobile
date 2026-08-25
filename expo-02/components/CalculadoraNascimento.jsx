import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    
    const anoNascimento = anoAtual - parseInt(idade);

    const diaFormatado = dia.padStart(2, '0');
    const mesFormatado = mes.padStart(2, '0');

    setDataNascimento(`${diaFormatado}/${mesFormatado}/${anoNascimento}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Descobrir Data de Nascimento</Text>

      {/* Inputs lado a lado */}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxResultado: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  labelResultado: {
    fontSize: 14,
    color: '#1565c0',
  },
  resultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginTop: 5,
  },
});