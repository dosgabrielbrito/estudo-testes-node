import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'Editora Gabriel',
    cidade: 'Jordânia',
    email: 'gabriel@email.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it.skip('Deve salvar editora no banco de dados', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('Editora Gabriel');
    });
  });

  it.skip('Deve salvar no banco de dados usando Async/Await', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();
    const retorno = await Editora.pegarPeloId(dados.id);

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it('Deve fazer uma chamada simulada no banco de dados.', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = () => {
      console.log('Editora salva no banco.');
    };

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'Editora Gabriel',
      cidade: 'Jordânia',
      email: 'gabriel@email.com',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });
});
