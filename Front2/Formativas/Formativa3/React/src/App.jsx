import { useState } from "react";
import CardPrato from "./components/CardPrato";
import Header from "./components/Header";
import { cardapio } from "./data/cardapio";

import "./App.css";

function App() {
  const [totalItens, setTotalItens] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  // Recebe a quantidade e o preço unitário do prato clicado
  function adicionarAoPedido(quantidade, precoUnitario) {
    setTotalItens((prevTotal) => prevTotal + quantidade);
    setValorTotal((prevValor) => prevValor + quantidade * precoUnitario);
  }

  function limparPedido() {
    setTotalItens(0);
    setValorTotal(0);
  }

  return (
    <main className="app">
      <Header
        totalItens={totalItens}
        totalPreco={valorTotal}
        onLimparPedido={limparPedido}
      />
      <section className="cardapio">
        {cardapio.map((prato) => (
          <CardPrato
            key={prato.id}
            nome={prato.nome}
            preco={prato.preco}
            categoria={prato.categoria}
            descricao={prato.descricao}
            onAdicionar={adicionarAoPedido}
          />
        ))}
      </section>
    </main>
  );
}

export default App;