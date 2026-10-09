import { useState } from "react";

function CardPrato({ nome, preco, categoria, descricao, onAdicionar }) {
  const [quantidade, setQuantidade] = useState(1);
  const [curtidas, setCurtidas] = useState(0);
  const [mostrarDescricao, setMostrarDescricao] = useState(false);

  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  function aumentar() {
    if (quantidade < 10) {
      setQuantidade(quantidade + 1);
    }
  }

  function adicionar() {
    // ⚠️ ATENÇÃO AQUI: Passamos quantidade E preco para o pai (App.jsx)
    onAdicionar(quantidade, preco);
    setQuantidade(1);
  }

  function curtir() {
    setCurtidas(curtidas + 1);
  }

  return (
    <article className="card-prato">
      <span className="categoria">{categoria}</span>
      <h2>{nome}</h2>
      <p className="preco">{precoFormatado}</p>

      
      <div className="quantidade">
        <button type="button" onClick={diminuir}>−</button>
        <span>{quantidade}</span>
        <button type="button" onClick={aumentar}>+</button>
      </div>

      <button type="button" className="btn-adicionar" onClick={adicionar}>
        Adicionar ao pedido
      </button>
      
      <button
        type="button"
        className="btn-descricao"
        onClick={() => setMostrarDescricao(!mostrarDescricao)}
      >
        {mostrarDescricao ? "Ocultar Descrição" : "Ver Descrição"}
      </button>

      {mostrarDescricao && <p className="descricao">{descricao}</p>}


      <button type="button" className="btn-curtir" onClick={curtir}>
        ❤️ {curtidas} {curtidas === 1 ? "Curtida" : "Curtidas"}
      </button>
    </article>
  );
}

export default CardPrato;