// todos os componentes. onde cria a estrutura toda, centralizador dos imports de componentes
import { useState } from "react";
import CardPrato from "./components/CardPrato";
import Header from "./components/Header";
import { cardapio } from "./data/cardapio";

import "./App.css";

function App() {
  // O Hook useState e as funções auxiliares devem ficar dentro do componente
  const [totalItens, setTotalItens] = useState(0);

  function adicionarAoPedido(quantidade) {
    setTotalItens((prevTotal) => prevTotal + quantidade);
  }

  return (
    <main className="app">
      <Header totalItens={totalItens} />
      <section className="cardapio">
        {cardapio.map((prato) => (
          <CardPrato
            key={prato.id}
            nome={prato.nome}
            preco={prato.preco}
            categoria={prato.categoria}
            onAdicionar={adicionarAoPedido}
          />
        ))}
      </section>
    </main>
  );
}

export default App;