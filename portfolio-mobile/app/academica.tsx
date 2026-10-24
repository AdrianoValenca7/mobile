
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
import { buscarDadosDaPessoa } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import type { Formacao } from '../types';

export default function Academica() {
  const { cores, escuro } = useTheme();

  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarFormacoes() {
    setCarregando(true);
    setErro(false);

    try {
      const dados = await buscarDadosDaPessoa<Formacao>('formacoes');
      setFormacoes(dados);
    } catch (error) {
      console.error('Erro ao carregar formações:', error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFormacoes();
  }, []);

  function formatarData(data: string | null) {
    if (!data) {
      return 'Atual';
    }

    const [ano, mes] = data.split('-');
    return `${mes}/${ano}`;
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: cores.fundo },
      ]}
      contentContainerStyle={styles.conteudo}
    >
      <View style={styles.cabecalho}>
        <Ionicons
          name="school-outline"
          size={34}
          color={cores.destaque}
        />

        <Text style={[styles.titulo, { color: cores.texto }]}>
          Experiência Acadêmica
        </Text>

        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Conheça minha formação acadêmica e minha trajetória
          na área de tecnologia.
        </Text>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator
            size="large"
            color={cores.destaque}
          />

          <Text
            style={[
              styles.mensagem,
              { color: cores.textoSecundario },
            ]}
          >
            Carregando formação acadêmica...
          </Text>
        </View>
      ) : erro ? (
        <View style={styles.centro}>
          <Ionicons
            name="alert-circle-outline"
            size={42}
            color="#ef4444"
          />

          <Text
            style={[
              styles.mensagem,
              { color: cores.textoSecundario },
            ]}
          >
            Não foi possível carregar a formação acadêmica.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={carregarFormacoes}
          >
            <Text
              style={[
                styles.textoBotao,
                { color: escuro ? '#0f172a' : '#ffffff' },
              ]}
            >
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : formacoes.length === 0 ? (
        <View style={styles.centro}>
          <Text
            style={[
              styles.mensagem,
              { color: cores.textoSecundario },
            ]}
          >
            Nenhuma formação acadêmica encontrada.
          </Text>
        </View>
      ) : (
        formacoes.map((formacao) => (
          <View
            key={formacao.id}
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <Image
              source={require('../assets/images/vista-aerea (1).jpg')}
              style={styles.imagemUniversidade}
              resizeMode="cover"
            />

            <View style={styles.cardConteudo}>
              <View style={styles.cardTopo}>
                <View
                  style={[
                    styles.iconeUniversidade,
                    { backgroundColor: cores.fundoIcone },
                  ]}
                >
                  <Ionicons
                    name="school-outline"
                    size={26}
                    color={cores.destaque}
                  />
                </View>

                <View style={styles.informacoes}>
                  <Text
                    style={[
                      styles.instituicao,
                      { color: cores.texto },
                    ]}
                  >
                    {formacao.instituicao}
                  </Text>

                  <Text
                    style={[
                      styles.curso,
                      { color: cores.destaque },
                    ]}
                  >
                    {formacao.curso}
                  </Text>
                </View>
              </View>

              <View style={styles.periodo}>
                <Ionicons
                  name="calendar-outline"
                  size={17}
                  color={cores.textoSecundario}
                />

                <Text
                  style={[
                    styles.textoPeriodo,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {formatarData(formacao.dataInicio)}
                  {' — '}
                  {formatarData(formacao.dataFim)}
                </Text>
              </View>

              {!formacao.dataFim && (
                <View
                  style={[
                    styles.status,
                    {
                      backgroundColor: escuro
                        ? '#164e63'
                        : '#e0f2fe',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textoStatus,
                      { color: cores.destaque },
                    ]}
                  >
                    Em andamento
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  cabecalho: {
    marginBottom: 28,
    gap: 12,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 15,
    lineHeight: 23,
  },

  centro: {
    alignItems: 'center',
    paddingVertical: 45,
    gap: 15,
  },

  mensagem: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
  },

  botao: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  textoBotao: {
    fontWeight: 'bold',
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },

  imagemUniversidade: {
    width: '100%',
    height: 190,
  },

  cardConteudo: {
    padding: 20,
    gap: 18,
  },

  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconeUniversidade: {
    width: 52,
    height: 52,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  informacoes: {
    flex: 1,
    gap: 6,
  },

  instituicao: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  curso: {
    fontSize: 15,
    fontWeight: '600',
  },

  periodo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  textoPeriodo: {
    fontSize: 14,
  },

  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  textoStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});
