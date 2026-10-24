
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { buscarDadosDaPessoa } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import type { Projeto } from '../types';

export default function Projetos() {
  const { cores, escuro } = useTheme();

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarProjetos() {
    setCarregando(true);
    setErro(false);

    try {
      const dados = await buscarDadosDaPessoa<Projeto>('projetos');
      setProjetos(dados);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function abrirProjeto(link: string) {
    if (!link) {
      Alert.alert(
        'Link indisponível',
        'Este projeto não possui um link cadastrado.'
      );
      return;
    }

    try {
      const endereco = /^https?:\/\//i.test(link)
        ? link
        : `https://${link}`;

      await Linking.openURL(endereco);
    } catch (error) {
      console.error('Erro ao abrir projeto:', error);

      Alert.alert(
        'Erro',
        'Não foi possível abrir o link deste projeto.'
      );
    }
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
          name="code-slash-outline"
          size={34}
          color={cores.destaque}
        />

        <Text
          style={[
            styles.titulo,
            { color: cores.texto },
          ]}
        >
          Meus Projetos
        </Text>

        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Conheça alguns projetos que desenvolvi e as
          tecnologias utilizadas em cada um deles.
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
            Carregando projetos...
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
            Não foi possível carregar os projetos.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={carregarProjetos}
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
      ) : projetos.length === 0 ? (
        <View style={styles.centro}>
          <Ionicons
            name="folder-open-outline"
            size={42}
            color={cores.textoSecundario}
          />

          <Text
            style={[
              styles.mensagem,
              { color: cores.textoSecundario },
            ]}
          >
            Nenhum projeto encontrado.
          </Text>
        </View>
      ) : (
        projetos.map((projeto) => (
          <View
            key={projeto.id}
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTopo}>
              <View
                style={[
                  styles.iconeProjeto,
                  { backgroundColor: cores.fundoIcone },
                ]}
              >
                <Ionicons
                  name="terminal-outline"
                  size={28}
                  color={cores.destaque}
                />
              </View>

              <View style={styles.informacoesProjeto}>
                <Text
                  style={[
                    styles.nomeProjeto,
                    { color: cores.texto },
                  ]}
                >
                  {projeto.nome}
                </Text>
              </View>
            </View>

            {projeto.descricao ? (
              <Text
                style={[
                  styles.descricao,
                  { color: cores.textoSecundario },
                ]}
              >
                {projeto.descricao}
              </Text>
            ) : null}

            {projeto.tecnologias ? (
              <View
                style={[
                  styles.secaoTecnologias,
                  { borderTopColor: cores.borda },
                ]}
              >
                <Text
                  style={[
                    styles.labelTecnologias,
                    { color: cores.textoSecundario },
                  ]}
                >
                  Tecnologias utilizadas
                </Text>

                <View style={styles.listaTecnologias}>
                  {projeto.tecnologias
                    .split(',')
                    .map((tecnologia) => tecnologia.trim())
                    .filter((tecnologia) => tecnologia.length > 0)
                    .map((tecnologia, index) => (
                      <View
                        key={`${tecnologia}-${index}`}
                        style={[
                          styles.tag,
                          {
                            backgroundColor: escuro
                              ? '#164e63'
                              : '#e0f2fe',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.textoTag,
                            { color: cores.destaque },
                          ]}
                        >
                          {tecnologia}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            ) : null}

            {projeto.link ? (
              <TouchableOpacity
                style={[
                  styles.botaoProjeto,
                  { backgroundColor: cores.destaque },
                ]}
                onPress={() => abrirProjeto(projeto.link)}
              >
                <Ionicons
                  name="open-outline"
                  size={19}
                  color={escuro ? '#0f172a' : '#ffffff'}
                />

                <Text
                  style={[
                    styles.textoBotao,
                    { color: escuro ? '#0f172a' : '#ffffff' },
                  ]}
                >
                  Visualizar projeto
                </Text>
              </TouchableOpacity>
            ) : null}
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
    marginTop: 10,
  },

  textoBotao: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    gap: 18,
    marginBottom: 16,
  },

  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconeProjeto: {
    width: 52,
    height: 52,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  informacoesProjeto: {
    flex: 1,
  },

  nomeProjeto: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 14,
    lineHeight: 23,
  },

  secaoTecnologias: {
    borderTopWidth: 1,
    paddingTop: 16,
    gap: 12,
  },

  labelTecnologias: {
    fontSize: 13,
    fontWeight: '600',
  },

  listaTecnologias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  textoTag: {
    fontSize: 12,
    fontWeight: '600',
  },

  botaoProjeto: {
    borderRadius: 11,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
