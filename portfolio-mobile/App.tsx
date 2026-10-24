
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';

type Pessoa = {
  id: string;
  nome: string;
  resumo: string;
};

type Formacao = {
  id: string;
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string | null;
  pessoaId: string;
};

type Experiencia = {
  id: string;
  empresa: string;
  cargo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string | null;
  pessoaId: string;
};

type Projeto = {
  id: string;
  nome: string;
  descricao: string;
  tecnologias: string;
  link: string;
  pessoaId: string;
};

type Habilidade = {
  id: string;
  nome: string;
  nivel: string;
  categoria: string;
  pessoaId: string;
};

const API_URL = 'https://curriculo-express-xi.vercel.app';
const PESSOA_ID = 'cf2c951e-b53d-4e31-ae3a-ce51eae7344f';

export default function App() {
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);

  const [carregandoSobre, setCarregandoSobre] = useState(true);
  const [carregandoExperiencias, setCarregandoExperiencias] = useState(true);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);
  const [carregandoHabilidades, setCarregandoHabilidades] = useState(true);

  const [erroSobre, setErroSobre] = useState(false);
  const [erroExperiencias, setErroExperiencias] = useState(false);
  const [erroProjetos, setErroProjetos] = useState(false);
  const [erroHabilidades, setErroHabilidades] = useState(false);

  const [mostrarSobre, setMostrarSobre] = useState(false);
  const [mostrarExperiencias, setMostrarExperiencias] = useState(false);
  const [mostrarProjetos, setMostrarProjetos] = useState(false);
  const [mostrarHabilidades, setMostrarHabilidades] = useState(false);

  useEffect(() => {
    async function buscarDados<T>(rota: string): Promise<T[]> {
      const resposta = await fetch(`${API_URL}/${rota}`);

      if (!resposta.ok) {
        throw new Error(`Erro ao buscar ${rota}`);
      }

      return resposta.json();
    }

    async function carregarSobre() {
      try {
        const [pessoas, formacoesAPI] = await Promise.all([
          buscarDados<Pessoa>('pessoas'),
          buscarDados<Formacao>('formacoes'),
        ]);

        setPessoa(
          pessoas.find((item) => item.id === PESSOA_ID) || null
        );

        setFormacoes(
          formacoesAPI.filter(
            (item) => item.pessoaId === PESSOA_ID
          )
        );
      } catch (error) {
        console.log('Erro ao carregar Sobre Mim:', error);
        setErroSobre(true);
      } finally {
        setCarregandoSobre(false);
      }
    }

    async function carregarExperiencias() {
      try {
        const dados = await buscarDados<Experiencia>('experiencias');

        setExperiencias(
          dados.filter((item) => item.pessoaId === PESSOA_ID)
        );
      } catch (error) {
        console.log('Erro ao carregar experiências:', error);
        setErroExperiencias(true);
      } finally {
        setCarregandoExperiencias(false);
      }
    }

    async function carregarProjetos() {
      try {
        const dados = await buscarDados<Projeto>('projetos');

        setProjetos(
          dados.filter((item) => item.pessoaId === PESSOA_ID)
        );
      } catch (error) {
        console.log('Erro ao carregar projetos:', error);
        setErroProjetos(true);
      } finally {
        setCarregandoProjetos(false);
      }
    }

    async function carregarHabilidades() {
      try {
        const dados = await buscarDados<Habilidade>('habilidades');

        setHabilidades(
          dados.filter((item) => item.pessoaId === PESSOA_ID)
        );
      } catch (error) {
        console.log('Erro ao carregar habilidades:', error);
        setErroHabilidades(true);
      } finally {
        setCarregandoHabilidades(false);
      }
    }

    carregarSobre();
    carregarExperiencias();
    carregarProjetos();
    carregarHabilidades();
  }, []);

  function formatarData(data: string | null) {
    if (!data) {
      return 'Atual';
    }

    const [ano, mes] = data.split('-');
    return `${mes}/${ano}`;
  }

  async function abrirLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.saudacao}>Olá, eu sou</Text>

        <Text style={styles.nome}>Adriano Valença</Text>

        <Text style={styles.cargo}>
          Estudante de Sistemas para a Internet
        </Text>

        <Text style={styles.descricao}>
          Tenho interesse em desenvolvimento de software,
          programação e criação de soluções tecnológicas.
        </Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Meu Portfólio</Text>

        <Text style={styles.subtitulo}>
          Conheça um pouco da minha trajetória.
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setMostrarSobre(!mostrarSobre)}
        >
          <Text style={styles.cardTitulo}>
            Sobre Mim {mostrarSobre ? '▲' : '▼'}
          </Text>

          <Text style={styles.cardDescricao}>
            Minha apresentação e formação acadêmica.
          </Text>
        </TouchableOpacity>

        {mostrarSobre && (
          <View>
            {carregandoSobre ? (
              <ActivityIndicator size="large" color="#38bdf8" />
            ) : erroSobre ? (
              <Text style={styles.mensagem}>
                Não foi possível carregar minhas informações.
              </Text>
            ) : (
              <>
                {pessoa && (
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheTitulo}>
                      {pessoa.nome}
                    </Text>

                    <Text style={styles.cardDescricao}>
                      {pessoa.resumo}
                    </Text>
                  </View>
                )}

                <Text style={styles.secaoTitulo}>
                  Formação Acadêmica
                </Text>

                {formacoes.length === 0 ? (
                  <Text style={styles.mensagem}>
                    Nenhuma formação encontrada.
                  </Text>
                ) : (
                  formacoes.map((formacao) => (
                    <View key={formacao.id} style={styles.detalhe}>
                      <Text style={styles.detalheTitulo}>
                        {formacao.instituicao}
                      </Text>

                      <Text style={styles.destaque}>
                        {formacao.curso}
                      </Text>

                      <Text style={styles.periodo}>
                        {formatarData(formacao.dataInicio)}
                        {' até '}
                        {formacao.dataFim
                          ? formatarData(formacao.dataFim)
                          : 'Em andamento'}
                      </Text>
                    </View>
                  ))
                )}
              </>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            setMostrarExperiencias(!mostrarExperiencias)
          }
        >
          <Text style={styles.cardTitulo}>
            Experiências {mostrarExperiencias ? '▲' : '▼'}
          </Text>

          <Text style={styles.cardDescricao}>
            Toque para visualizar minha trajetória profissional.
          </Text>
        </TouchableOpacity>

        {mostrarExperiencias && (
          <View>
            {carregandoExperiencias ? (
              <ActivityIndicator size="large" color="#38bdf8" />
            ) : erroExperiencias ? (
              <Text style={styles.mensagem}>
                Não foi possível carregar as experiências.
              </Text>
            ) : experiencias.length === 0 ? (
              <Text style={styles.mensagem}>
                Nenhuma experiência encontrada.
              </Text>
            ) : (
              experiencias.map((experiencia) => (
                <View key={experiencia.id} style={styles.detalhe}>
                  <Text style={styles.detalheTitulo}>
                    {experiencia.empresa}
                  </Text>

                  <Text style={styles.destaque}>
                    {experiencia.cargo}
                  </Text>

                  <Text style={styles.periodo}>
                    {formatarData(experiencia.dataInicio)}
                    {' até '}
                    {formatarData(experiencia.dataFim)}
                  </Text>

                  <Text style={styles.cardDescricao}>
                    {experiencia.descricao}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.card}
          onPress={() => setMostrarProjetos(!mostrarProjetos)}
        >
          <Text style={styles.cardTitulo}>
            Projetos {mostrarProjetos ? '▲' : '▼'}
          </Text>

          <Text style={styles.cardDescricao}>
            Toque para conhecer meus projetos.
          </Text>
        </TouchableOpacity>

        {mostrarProjetos && (
          <View>
            {carregandoProjetos ? (
              <ActivityIndicator size="large" color="#38bdf8" />
            ) : erroProjetos ? (
              <Text style={styles.mensagem}>
                Não foi possível carregar os projetos.
              </Text>
            ) : projetos.length === 0 ? (
              <Text style={styles.mensagem}>
                Nenhum projeto encontrado.
              </Text>
            ) : (
              projetos.map((projeto) => (
                <View key={projeto.id} style={styles.detalhe}>
                  <Text style={styles.detalheTitulo}>
                    {projeto.nome}
                  </Text>

                  <Text style={styles.cardDescricao}>
                    {projeto.descricao}
                  </Text>

                  <Text style={styles.tecnologias}>
                    Tecnologias: {projeto.tecnologias}
                  </Text>

                  {projeto.link ? (
                    <TouchableOpacity
                      style={styles.botao}
                      onPress={() => abrirLink(projeto.link)}
                    >
                      <Text style={styles.botaoTexto}>
                        Abrir projeto ↗
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            setMostrarHabilidades(!mostrarHabilidades)
          }
        >
          <Text style={styles.cardTitulo}>
            Habilidades {mostrarHabilidades ? '▲' : '▼'}
          </Text>

          <Text style={styles.cardDescricao}>
            Toque para visualizar minhas habilidades.
          </Text>
        </TouchableOpacity>

        {mostrarHabilidades && (
          <View>
            {carregandoHabilidades ? (
              <ActivityIndicator size="large" color="#38bdf8" />
            ) : erroHabilidades ? (
              <Text style={styles.mensagem}>
                Não foi possível carregar as habilidades.
              </Text>
            ) : habilidades.length === 0 ? (
              <Text style={styles.mensagem}>
                Nenhuma habilidade encontrada.
              </Text>
            ) : (
              habilidades.map((habilidade) => (
                <View key={habilidade.id} style={styles.detalhe}>
                  <Text style={styles.detalheTitulo}>
                    {habilidade.nome}
                  </Text>

                  <Text style={styles.destaque}>
                    Nível: {habilidade.nivel}
                  </Text>

                  <Text style={styles.cardDescricao}>
                    Categoria: {habilidade.categoria}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: 85,
    paddingHorizontal: 25,
    paddingBottom: 45,
    backgroundColor: '#1e293b',
  },
  saudacao: {
    color: '#38bdf8',
    fontSize: 18,
    marginBottom: 10,
  },
  nome: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cargo: {
    color: '#e2e8f0',
    fontSize: 17,
    marginBottom: 20,
  },
  descricao: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 24,
  },
  conteudo: {
    padding: 25,
    paddingBottom: 50,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 15,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 22,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitulo: {
    color: '#38bdf8',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescricao: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
  },
  detalhe: {
    backgroundColor: '#172554',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  detalheTitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  destaque: {
    color: '#38bdf8',
    fontSize: 16,
    marginBottom: 8,
  },
  periodo: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 12,
  },
  tecnologias: {
    color: '#38bdf8',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 15,
  },
  secaoTitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 5,
  },
  botao: {
    backgroundColor: '#0284c7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mensagem: {
    color: '#cbd5e1',
    marginBottom: 15,
  },
});
