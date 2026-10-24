
export interface Pessoa {
  id: string;
  nome: string;
  resumo: string;
  email: string;
  telefone: string;
}

export interface Formacao {
  id: string;
  pessoaId: string;
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string | null;
}

export interface Experiencia {
  id: string;
  pessoaId: string;
  empresa: string;
  cargo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string | null;
}

export interface Projeto {
  id: string;
  pessoaId: string;
  nome: string;
  descricao: string;
  tecnologias: string;
  link: string;
}

export interface Habilidade {
  id: string;
  pessoaId: string;
  nome: string;
  nivel: string;
  categoria: string;
}
