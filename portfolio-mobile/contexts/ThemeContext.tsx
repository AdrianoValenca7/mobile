
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type Cores = {
  fundo: string;
  card: string;
  texto: string;
  textoSecundario: string;
  destaque: string;
  borda: string;
  fundoIcone: string;
};

type ThemeContextType = {
  escuro: boolean;
  cores: Cores;
  alternarTema: () => void;
};

const coresEscuras: Cores = {
  fundo: '#0f172a',
  card: '#1e293b',
  texto: '#ffffff',
  textoSecundario: '#cbd5e1',
  destaque: '#38bdf8',
  borda: '#334155',
  fundoIcone: '#0f172a',
};

const coresClaras: Cores = {
  fundo: '#f1f5f9',
  card: '#ffffff',
  texto: '#0f172a',
  textoSecundario: '#475569',
  destaque: '#0284c7',
  borda: '#cbd5e1',
  fundoIcone: '#e0f2fe',
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [escuro, setEscuro] = useState(true);

  function alternarTema() {
    setEscuro((valorAtual) => !valorAtual);
  }

  return (
    <ThemeContext.Provider
      value={{
        escuro,
        cores: escuro ? coresEscuras : coresClaras,
        alternarTema,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      'useTheme deve ser utilizado dentro de ThemeProvider'
    );
  }

  return contexto;
}
