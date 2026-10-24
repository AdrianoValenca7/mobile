
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { buscarDados, PESSOA_ID } from '../services/api';
import type { Pessoa } from '../types';

export default function Home() {
  const { escuro, cores } = useTheme();

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarPessoa() {
    setCarregando(true);
    setErro(false);

    try {
      const pessoas = await buscarDados<Pessoa>('pessoas');

      const minhaPessoa = pessoas.find(
        (item) => item.id === PESSOA_ID
      );

      if (!minhaPessoa) {
        throw new Error('Pessoa não encontrada na API');
      }

      setPessoa(minhaPessoa);
    } catch (error) {
      console.error('Erro ao carregar pessoa:', error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPessoa();
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: cores.fundo },
      ]}
      contentContainerStyle={styles.conteudo}
    >
      <Image
        source={require('../assets/images/Gemini_Generated_Image_gsch64gsch64gsch (1).png')}
        style={[
          styles.fotoPerfil,
          { borderColor: cores.destaque },
        ]}
        resizeMode="cover"
      />

      <Text
        style={[
          styles.saudacao,
          { color: cores.textoSecundario },
        ]}
      >
        Olá, eu sou
      </Text>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={cores.destaque}
          style={{ marginVertical: 20 }}
        />
      ) : erro ? (
        <View style={styles.erroContainer}>
          <Text
            style={[
              styles.descricao,
              { color: cores.textoSecundario },
            ]}
          >
            Não foi possível carregar meus dados.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={carregarPessoa}
          >
            <Text
              style={{
                color: escuro ? '#0f172a' : '#ffffff',
                fontWeight: 'bold',
              }}
            >
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.titulo,
              { color: cores.texto },
            ]}
          >
            {pessoa?.nome}
          </Text>

          <Text
            style={[
              styles.subtitulo,
              { color: cores.destaque },
            ]}
          >
            Desenvolvedor em formação
          </Text>

          <Text
            style={[
              styles.descricao,
              { color: cores.textoSecundario },
            ]}
          >
            {pessoa?.resumo}
          </Text>
        </>
      )}

      <View
        style={[
          styles.linha,
          { backgroundColor: cores.destaque },
        ]}
      />

      <View
        style={[
          styles.card,
          {
            backgroundColor: cores.card,
            borderColor: cores.borda,
          },
        ]}
      >
        <Ionicons
          name="compass-outline"
          size={27}
          color={cores.destaque}
          style={{ marginBottom: 12 }}
        />

        <Text
          style={[
            styles.mensagem,
            { color: cores.textoSecundario },
          ]}
        >
          Explore meu portfólio pelas abas abaixo para
          conhecer minha formação acadêmica, experiências
          profissionais e projetos.
        </Text>
      </View>

      <Text
        style={[
          styles.indicadorTema,
          { color: cores.textoSecundario },
        ]}
      >
        Tema atual: {escuro ? 'Escuro' : 'Claro'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 35,
  },

  fotoPerfil: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    marginBottom: 25,
  },

  saudacao: {
    fontSize: 17,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },

  descricao: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 18,
  },

  linha: {
    width: 65,
    height: 3,
    borderRadius: 3,
    marginVertical: 25,
  },

  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },

  mensagem: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 23,
  },

  indicadorTema: {
    fontSize: 12,
    marginTop: 25,
  },

  erroContainer: {
    alignItems: 'center',
    gap: 15,
  },

  botao: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
