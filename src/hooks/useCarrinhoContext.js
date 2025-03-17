import { CarrinhoContext } from "@/context/CarrinhoContext";
import { useContext } from "react";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  const mudarQuantidade = (id, quantidade) => {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  };

  const adicionarProduto = (novoProduto) => {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );

    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);

    setCarrinho([...carrinhoAtualizado]);
  };

  const removerProduto = (id) => {
    //encontra o produto em questão.
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    //verifica se é o último.
    const ehOUltimo = produto.quantidade === 1;

    //se for o último, remove da lista.
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) => {
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
      });
    }

    //se não for o último, decresce a quantidade.
    const carrinhoAtualizado = mudarQuantidade(id, -1);

    setCarrinho([...carrinhoAtualizado]);
  };

  const removerProdutoCarrinho = (id) => {
    const carrinhoAtualizado = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    );
    setCarrinho(carrinhoAtualizado);
  };

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho
  };
};
