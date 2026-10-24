
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import {
  ThemeProvider,
  useTheme,
} from '../contexts/ThemeContext';

function Navegacao() {
  const { escuro, cores, alternarTema } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: cores.card,
        },
        headerTintColor: cores.texto,
        tabBarStyle: {
          backgroundColor: cores.card,
          borderTopColor: cores.borda,
        },
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: escuro ? '#94a3b8' : '#64748b',
        sceneStyle: {
          backgroundColor: cores.fundo,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={alternarTema}
            accessibilityLabel="Alternar tema"
            style={{ marginRight: 18 }}
          >
            <Ionicons
              name={escuro ? 'sunny-outline' : 'moon-outline'}
              size={24}
              color={cores.texto}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={typeof color === 'string' ? color : '#94a3b8'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={typeof color === 'string' ? color : '#94a3b8'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="academica"
        options={{
          title: 'Acadêmica',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="school-outline"
              size={size}
              color={typeof color === 'string' ? color : '#94a3b8'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profissional"
        options={{
          title: 'Profissional',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="briefcase-outline"
              size={size}
              color={typeof color === 'string' ? color : '#94a3b8'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="projetos"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="code-slash-outline"
              size={size}
              color={typeof color === 'string' ? color : '#94a3b8'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <Navegacao />
    </ThemeProvider>
  );
}
