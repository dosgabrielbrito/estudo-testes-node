import Item from '../Item.js';
import Carrinho from '../Carrinho.js';

describe('Testes da classe Carrinho', () => {
  it('Deve inicializar vazio.', () => {
    const carrinho = new Carrinho();

    expect(carrinho.subtotal).toBeNull();
    expect(carrinho.frete).toBeNull();
    expect(carrinho.total).toBeNull();
  });

  it('Deve ter itens armazenados.', () => {
    const item1 = new Item('Banana', 2, 5);
    const item2 = new Item('Maçã', 2, 5);
    const carrinho = new Carrinho();

    carrinho.adiciona(item1);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe('object');
    expect(carrinho.itens[0]).toBe(item1);
    expect(carrinho.itens[1]).toBe(item2);

    expect(carrinho.itens).toContain(item1);
    expect(carrinho.itens).toContain(item2);
  });

  it('Deve ter a propriedade "total" na inicialização.', () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty('total');
  });

  it('Após a finalização de compra sem itens, deve lançar erro.', () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }
    expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
  });

  it('Deve adicionar o frete.', () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(10);

    expect(carrinho.frete).toBe(10);
  });

  it('Deve finalizar as compras com sucesso.', () => {
    const item1 = new Item('Banana', 2, 5);
    const item2 = new Item('Maçã', 2, 5);
    const carrinho = new Carrinho();

    carrinho.adiciona(item1);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(10);
    carrinho.finalizaCompra();

    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: 20,
      frete: 10,
      total: 30,
    });
  });
});
