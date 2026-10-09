// todos os componentes. onde cria a estrutura toda, centralizador dos imports de componentes

import CardPrato from "./components/CardPrato";
import Header from "./components/Header";

const cardapio = [
  { id: 1, nome: "Feijoada", preco: 42.90, categoria: "Prato principal"},
  { id: 2, nome: "Moqueca", preco: 49.90, categoria: "Prato principal" },
{ id: 3, nome: "Pudim", preco: 15.00, categoria: "Sobremesa" },
]

function App() {
  return (
    <main className="app">
      <Header />
      <section className="caradpio">
        {cardapio.map((prato) => ( //O .map() cria um componente por item do array.
          <CardPrato
          key={prato.id} //O key={prato.id} dá identidade única a cada item — use sempre um id, nunca o índice.
          nome={prato.nome}
          preco={prato.preco}
          categoria={prato.categoria}
          />
        ))}
      </section>
    </main>
  )
}

export default App;