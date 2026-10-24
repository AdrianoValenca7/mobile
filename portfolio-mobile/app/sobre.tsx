
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  buscarDados,
  buscarDadosDaPessoa,
  PESSOA_ID,
} from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import type { Pessoa, Habilidade } from '../types';

export default function Sobre() {
  const { cores, escuro } = useTheme();

  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarDados() {
    setCarregando(true);
    setErro(false);

    try {
      const [pessoas, dadosHabilidades] = await Promise.all([
        buscarDados<Pessoa>('pessoas'),
        buscarDadosDaPessoa<Habilidade>('habilidades'),
      ]);

      const minhaPessoa = pessoas.find(
        (item) => item.id === PESSOA_ID
      );

      setPessoa(minhaPessoa ?? null);
      setHabilidades(dadosHabilidades);
    } catch (error) {
      console.error('Erro ao carregar informações:', error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const tecnologias = [
    ['React Native', 'Construção da interface mobile.'],
    ['Expo', 'Desenvolvimento e execução do aplicativo.'],
    ['Expo Router', 'Navegação entre as cinco telas.'],
    ['TypeScript', 'Tipagem dos componentes e dados.'],
    ['Expo Vector Icons', 'Ícones utilizados na interface.'],
    ['Fetch API', 'Comunicação com o back-end.'],
    ['Context API', 'Compartilhamento do tema entre as telas.'],
    ['Node.js e Express', 'API REST do Currículo Express.'],
    ['PostgreSQL e Sequelize', 'Persistência dos dados no back-end.'],
    ['NeonDB e Vercel', 'Hospedagem do banco e da API.'],
  ];

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
          name="person-circle-outline"
          size={36}
          color={cores.destaque}
        />

        <Text
          style={[
            styles.titulo,
            { color: cores.texto },
          ]}
        >
          Sobre Mim e o Aplicativo
        </Text>

        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Conheça minha trajetória, minhas habilidades
          e as tecnologias utilizadas neste projeto.
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
            Carregando informações...
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
            Não foi possível carregar as informações.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={carregarDados}
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
      ) : (
        <>
          <View
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTitulo}>
              <Ionicons
                name="person-outline"
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.tituloCard,
                  { color: cores.texto },
                ]}
              >
                Sobre Mim
              </Text>
            </View>

            <Text
              style={[
                styles.nome,
                { color: cores.destaque },
              ]}
            >
              {pessoa?.nome ?? 'Adriano Valença'}
            </Text>

            <Text
              style={[
                styles.descricao,
                { color: cores.textoSecundario },
              ]}
            >
              {pessoa?.resumo ??
                'Estudante de Sistemas para a Internet, interessado em desenvolvimento de software.'}
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTitulo}>
              <Ionicons
                name="construct-outline"
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.tituloCard,
                  { color: cores.texto },
                ]}
              >
                Minhas Habilidades
              </Text>
            </View>

            {habilidades.length === 0 ? (
              <Text
                style={[
                  styles.descricao,
                  { color: cores.textoSecundario },
                ]}
              >
                Nenhuma habilidade cadastrada.
              </Text>
            ) : (
              habilidades.map((habilidade) => (
                <View
                  key={habilidade.id}
                  style={[
                    styles.habilidade,
                    { borderTopColor: cores.borda },
                  ]}
                >
                  <View style={styles.habilidadeInformacoes}>
                    <Text
                      style={[
                        styles.nomeHabilidade,
                        { color: cores.texto },
                      ]}
                    >
                      {habilidade.nome}
                    </Text>

                    <Text
                      style={[
                        styles.categoria,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {habilidade.categoria}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.nivel,
                      {
                        backgroundColor: escuro
                          ? '#164e63'
                          : '#e0f2fe',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoNivel,
                        { color: cores.destaque },
                      ]}
                    >
                      {habilidade.nivel}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTitulo}>
              <Ionicons
                name="layers-outline"
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.tituloCard,
                  { color: cores.texto },
                ]}
              >
                Tecnologias do Aplicativo
              </Text>
            </View>

            <Text
              style={[
                styles.descricao,
                { color: cores.textoSecundario },
              ]}
            >
              Este aplicativo utiliza as seguintes tecnologias:
            </Text>

            {tecnologias.map(([nome, descricao]) => (
              <View
                key={nome}
                style={[
                  styles.tecnologia,
                  { borderTopColor: cores.borda },
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={19}
                  color={cores.destaque}
                />

                <View style={styles.tecnologiaConteudo}>
                  <Text
                    style={[
                      styles.nomeTecnologia,
                      { color: cores.texto },
                    ]}
                  >
                    {nome}
                  </Text>

                  <Text
                    style={[
                      styles.descricaoTecnologia,
                      { color: cores.textoSecundario },
                    ]}
                  >
                    {descricao}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTitulo}>
              <Ionicons
                name="folder-open-outline"
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.tituloCard,
                  { color: cores.texto },
                ]}
              >
                Organização do Projeto
              </Text>
            </View>

            <Text
              style={[
                styles.descricao,
                { color: cores.textoSecundario },
              ]}
            >
              O aplicativo está organizado nos seguintes módulos:
            </Text>

            {[
              'app/ — Telas e navegação com Expo Router.',
              'services/ — Comunicação com a API REST.',
              'types/ — Interfaces TypeScript dos dados.',
              'contexts/ — Gerenciamento do tema.',
              'assets/images/ — Imagens do aplicativo.',
            ].map((modulo) => (
              <Text
                key={modulo}
                style={[
                  styles.modulo,
                  { color: cores.textoSecundario },
                ]}
              >
                {modulo}
              </Text>
            ))}
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardTitulo}>
              <Ionicons
                name="sparkles-outline"
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.tituloCard,
                  { color: cores.texto },
                ]}
              >
                Funcionalidade Extra
              </Text>
            </View>

            <Text
              style={[
                styles.descricao,
                { color: cores.textoSecundario },
              ]}
            >
              O aplicativo oferece alternância entre tema claro
              e tema escuro. O usuário pode tocar no ícone de
              sol ou lua no cabeçalho para alterar a aparência
              de todas as telas.
            </Text>

            <View
              style={[
                styles.temaInfo,
                {
                  backgroundColor: cores.fundoIcone,
                  borderColor: cores.borda,
                },
              ]}
            >
              <Ionicons
                name={escuro ? 'moon-outline' : 'sunny-outline'}
                size={23}
                color={cores.destaque}
              />

              <Text
                style={[
                  styles.temaTexto,
                  { color: cores.texto },
                ]}
              >
                Tema atual: {escuro ? 'Escuro' : 'Claro'}
              </Text>
            </View>

            <Text
              style={[
                styles.descricao,
                { color: cores.textoSecundario },
              ]}
            >
              O aplicativo também permite abrir links externos
              dos projetos e possui tratamento de erros nas
              requisições à API.
            </Text>
          </View>
        </>
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
    paddingBottom: 45,
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
    padding: 20,
    marginBottom: 18,
    gap: 15,
  },

  cardTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  tituloCard: {
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
  },

  nome: {
    fontSize: 21,
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 14,
    lineHeight: 23,
  },

  habilidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 10,
  },

  habilidadeInformacoes: {
    flex: 1,
    gap: 4,
  },

  nomeHabilidade: {
    fontSize: 15,
    fontWeight: '600',
  },

  categoria: {
    fontSize: 12,
  },

  nivel: {
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  textoNivel: {
    fontSize: 12,
    fontWeight: '600',
  },

  tecnologia: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    borderTopWidth: 1,
    paddingTop: 12,
  },

  tecnologiaConteudo: {
    flex: 1,
    gap: 4,
  },

  nomeTecnologia: {
    fontSize: 15,
    fontWeight: '600',
  },

  descricaoTecnologia: {
    fontSize: 13,
    lineHeight: 20,
  },

  modulo: {
    fontSize: 13,
    lineHeight: 22,
  },

  temaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },

  temaTexto: {
    fontSize: 15,
    fontWeight: '600',
  },
});
