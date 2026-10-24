
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
import { buscarDadosDaPessoa } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import type { Experiencia } from '../types';

export default function Profissional() {
  const { cores, escuro } = useTheme();

  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregarExperiencias() {
    setCarregando(true);
    setErro(false);

    try {
      const dados = await buscarDadosDaPessoa<Experiencia>('experiencias');
      setExperiencias(dados);
    } catch (error) {
      console.error('Erro ao carregar experiências:', error);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarExperiencias();
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
          name="briefcase-outline"
          size={34}
          color={cores.destaque}
        />

        <Text
          style={[
            styles.titulo,
            { color: cores.texto },
          ]}
        >
          Experiência Profissional
        </Text>

        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Conheça minha trajetória e as experiências que
          contribuíram para meu desenvolvimento profissional.
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
            Carregando experiências profissionais...
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
            Não foi possível carregar as experiências.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={carregarExperiencias}
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
      ) : experiencias.length === 0 ? (
        <View style={styles.centro}>
          <Ionicons
            name="briefcase-outline"
            size={42}
            color={cores.textoSecundario}
          />

          <Text
            style={[
              styles.mensagem,
              { color: cores.textoSecundario },
            ]}
          >
            Nenhuma experiência profissional encontrada.
          </Text>
        </View>
      ) : (
        experiencias.map((experiencia) => (
          <View
            key={experiencia.id}
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
                  styles.iconeEmpresa,
                  { backgroundColor: cores.fundoIcone },
                ]}
              >
                <Ionicons
                  name="business-outline"
                  size={27}
                  color={cores.destaque}
                />
              </View>

              <View style={styles.informacoesEmpresa}>
                <Text
                  style={[
                    styles.empresa,
                    { color: cores.texto },
                  ]}
                >
                  {experiencia.empresa}
                </Text>

                <Text
                  style={[
                    styles.cargo,
                    { color: cores.destaque },
                  ]}
                >
                  {experiencia.cargo}
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
                {formatarData(experiencia.dataInicio)}
                {' — '}
                {formatarData(experiencia.dataFim)}
              </Text>
            </View>

            {experiencia.descricao ? (
              <View
                style={[
                  styles.descricaoContainer,
                  { borderTopColor: cores.borda },
                ]}
              >
                <Text
                  style={[
                    styles.descricao,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {experiencia.descricao}
                </Text>
              </View>
            ) : null}

            {!experiencia.dataFim && (
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
                  Experiência atual
                </Text>
              </View>
            )}
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
    gap: 17,
    marginBottom: 16,
  },

  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconeEmpresa: {
    width: 52,
    height: 52,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  informacoesEmpresa: {
    flex: 1,
    gap: 5,
  },

  empresa: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cargo: {
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

  descricaoContainer: {
    borderTopWidth: 1,
    paddingTop: 15,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 23,
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
