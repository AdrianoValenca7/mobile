import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [vez, setVez] = useState('A'); 
  const [fimDeJogo, setFimDeJogo] = useState(false);

  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);
  const [statusA, setStatusA] = useState('');
  const [statusB, setStatusB] = useState('');
  
  const [vitoriasA, setVitoriasA] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);

  const rolarDados = () => [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];

  const jogarA = () => {
    setStatusA('');
    setStatusB('');
    
    const novosDados = rolarDados();
    setDadosA(novosDados);
    setVez('B'); 
  };

  const jogarB = () => {
    const novosDadosB = rolarDados();
    setDadosB(novosDadosB);
    avaliarRodada(dadosA, novosDadosB);
  };

  const avaliarRodada = (valoresA, valoresB) => {
    const somaA = valoresA[0] + valoresA[1];
    const somaB = valoresB[0] + valoresB[1];

    let vitoriasAtuaisA = vitoriasA;
    let vitoriasAtuaisB = vitoriasB;

    if (somaA > somaB) {
      setStatusA('Ganhou');
      setStatusB('Perdeu');
      vitoriasAtuaisA += 1;
      setVitoriasA(vitoriasAtuaisA);
    } else if (somaB > somaA) {
      setStatusA('Perdeu');
      setStatusB('Ganhou');
      vitoriasAtuaisB += 1;
      setVitoriasB(vitoriasAtuaisB);
    } else {
      setStatusA('Empatou');
      setStatusB('Empatou');
    }

    if (rodada >= 5) {
      setFimDeJogo(true);
    } else {
      setRodada(rodada + 1);
      setVez('A'); 
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setVez('A');
    setFimDeJogo(false);
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setStatusA('');
    setStatusB('');
    setVitoriasA(0);
    setVitoriasB(0);
  };

  let vencedorFinal = '';
  if (vitoriasA > vitoriasB) vencedorFinal = 'Jogador A venceu a partida!';
  else if (vitoriasB > vitoriasA) vencedorFinal = 'Jogador B venceu a partida!';
  else vencedorFinal = 'Empate geral na partida!';

  return (
    <View style={styles.cardContainer}>
      {!fimDeJogo ? (
        <>
          <Text style={styles.rodadaTexto}>Rodada {rodada} de 5</Text>
          
          <View style={styles.jogadoresContainer}>
            {/* Bloco Jogador A */}
            <View style={styles.jogadorBox}>
              <View style={styles.dadosRow}>
                <Dado valor={dadosA[0]} />
                <Dado valor={dadosA[1]} />
              </View>
              <Text style={styles.statusTexto}>{statusA || 'Jogador A'}</Text>
              <TouchableOpacity 
                onPress={jogarA} 
                disabled={vez !== 'A'}
                style={[styles.botao, vez !== 'A' && styles.botaoDesabilitado]}
              >
                <Text style={styles.botaoTexto}>Jogar Dado</Text>
              </TouchableOpacity>
            </View>

            {/* Bloco Jogador B */}
            <View style={styles.jogadorBox}>
              <View style={styles.dadosRow}>
                <Dado valor={dadosB[0]} />
                <Dado valor={dadosB[1]} />
              </View>
              <Text style={styles.statusTexto}>{statusB || 'Jogador B'}</Text>
              <TouchableOpacity 
                onPress={jogarB} 
                disabled={vez !== 'B'}
                style={[styles.botao, vez !== 'B' && styles.botaoDesabilitado]}
              >
                <Text style={styles.botaoTexto}>Jogar Dado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.fimDeJogoContainer}>
          <Text style={styles.tituloFim}>Fim de Jogo!</Text>
          <Text style={styles.vencedorTexto}>{vencedorFinal}</Text>
          <Text style={styles.placarTexto}>
            Placar final: Jogador A ({vitoriasA}) x ({vitoriasB}) Jogador B
          </Text>
          <TouchableOpacity 
            onPress={reiniciarJogo}
            style={styles.botaoReiniciar}
          >
            <Text style={styles.botaoReiniciarTexto}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rodadaTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  jogadoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  jogadorBox: {
    alignItems: 'center',
    flex: 1,
  },
  dadosRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statusTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
    color: '#334155',
  },
  botao: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 4,
  },
  botaoDesabilitado: {
    backgroundColor: '#94a3b8',
  },
  botaoTexto: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  fimDeJogoContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tituloFim: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  vencedorTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 6,
    textAlign: 'center',
  },
  placarTexto: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 16,
  },
  botaoReiniciar: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botaoReiniciarTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});