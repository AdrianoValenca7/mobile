
const API_URL = 'https://curriculo-express-xi.vercel.app';

export const PESSOA_ID = 'cf2c951e-b53d-4e31-ae3a-ce51eae7344f';

export async function buscarDados<T>(rota: string): Promise<T[]> {
  const resposta = await fetch(`${API_URL}/${rota}`);

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar ${rota}: ${resposta.status}`);
  }

  const dados: T[] = await resposta.json();

  return dados;
}

export async function buscarDadosDaPessoa<T extends { pessoaId: string }>(
  rota: string
): Promise<T[]> {
  const dados = await buscarDados<T>(rota);

  return dados.filter((item) => item.pessoaId === PESSOA_ID);
}
